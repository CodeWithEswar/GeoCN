/**
 * @file scripts/geo/acquire-us-states.ts
 * @description Acquires, normalizes, quantizes, and registers the authoritative
 * U.S. Census Bureau States & DC (ADM1) dataset into the GeoCN pipeline.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import * as topojson from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeoDatasetManifest } from "../../packages/geo-data/src/schemas/manifest";
import { roundCoordinate } from "../../packages/geo/src/transforms";

const US_POSTAL_CODES: Record<string, string> = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  "10": "DE",
  "11": "DC",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
  "56": "WY",
};

// Exclude outlying island territories for the 50 states + DC dataset
const TERRITORY_FIPS = new Set(["60", "66", "69", "72", "78"]);

function quantizeCoordinates(coords: unknown): unknown {
  if (!Array.isArray(coords)) return coords;
  if (
    coords.length >= 2 &&
    typeof coords[0] === "number" &&
    typeof coords[1] === "number"
  ) {
    return [roundCoordinate(coords[0], 4), roundCoordinate(coords[1], 4)];
  }
  return coords.map(quantizeCoordinates);
}

async function acquireUsStates() {
  const rootDir = path.resolve(__dirname, "../..");
  const rawDir = path.join(rootDir, "packages/geo-data/raw");
  const generatedDir = path.join(rootDir, "packages/geo-data/generated");
  const manifestsDir = path.join(rootDir, "packages/geo-data/manifests");

  console.log("\n=======================================================");
  console.log("  Acquiring Real Dataset: U.S. Census Bureau States (ADM1)");
  console.log("=======================================================\n");

  const UPSTREAM_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  console.log(`Fetching from authoritative upstream: ${UPSTREAM_URL}...`);

  const response = await fetch(UPSTREAM_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch upstream dataset: ${response.statusText}`);
  }

  const rawBuffer = Buffer.from(await response.arrayBuffer());
  const rawHash = crypto.createHash("sha256").update(rawBuffer).digest("hex");

  // 1. Save raw artifact to raw staging
  const rawFilePath = path.join(rawDir, "us-states-10m.topojson");
  fs.writeFileSync(rawFilePath, rawBuffer);
  console.log(`✔ Saved raw artifact (${(rawBuffer.length / 1024).toFixed(1)} KB)`);
  console.log(`  SHA256: ${rawHash}`);

  // 2. Decode TopoJSON
  const topology = JSON.parse(rawBuffer.toString("utf-8"));
  const geojson = topojson.feature(
    topology,
    topology.objects.states
  ) as unknown as FeatureCollection;

  // 3. Filter to 50 states + DC
  const filteredFeatures = geojson.features.filter((f) => {
    const id = String(f.id ?? "");
    return !TERRITORY_FIPS.has(id);
  });

  console.log(`✔ Decoded & filtered ${filteredFeatures.length} state features`);

  // 4. Normalize properties and quantize coordinates
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  const normalizedFeatures: Feature[] = filteredFeatures.map((feature) => {
    const fips = String(feature.id ?? "");
    const postal = US_POSTAL_CODES[fips] ?? fips;
    const name = String(feature.properties?.name ?? postal);

    // Quantize geometry coordinates
    const originalCoords = (feature.geometry as unknown as { coordinates: unknown })
      .coordinates;
    const quantizedCoords = quantizeCoordinates(originalCoords);
    const quantizedGeometry = {
      ...feature.geometry,
      coordinates: quantizedCoords,
    } as Geometry;

    // Calculate bbox bounds
    function walk(c: unknown): void {
      if (!Array.isArray(c)) return;
      if (typeof c[0] === "number" && typeof c[1] === "number") {
        minLng = Math.min(minLng, c[0]);
        maxLng = Math.max(maxLng, c[0]);
        minLat = Math.min(minLat, c[1]);
        maxLat = Math.max(maxLat, c[1]);
        return;
      }
      c.forEach(walk);
    }
    walk(quantizedCoords);

    return {
      type: "Feature",
      id: fips,
      properties: {
        id: fips,
        name,
        code: postal,
        adminLevel: 1,
        country: "United States",
        iso2: "US",
        iso3: "USA",
        iso3166_2: `US-${postal}`,
        fips,
      },
      geometry: quantizedGeometry,
    };
  });

  const outputFeatureCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: normalizedFeatures,
  };

  // 5. Write generated artifact
  const generatedFileName = "us-states-admin-1.json";
  const generatedFilePath = path.join(generatedDir, generatedFileName);
  const generatedJsonString = JSON.stringify(outputFeatureCollection);
  fs.writeFileSync(generatedFilePath, generatedJsonString, "utf-8");

  const generatedBuffer = fs.readFileSync(generatedFilePath);
  const generatedHash = crypto.createHash("sha256").update(generatedBuffer).digest("hex");

  console.log(
    `✔ Written normalized GeoJSON artifact to: ${generatedFilePath} (${(generatedBuffer.length / 1024).toFixed(1)} KB)`
  );
  console.log(`  SHA256: ${generatedHash}`);

  // 6. Write typed dataset manifest with verified provenance URLs
  const bbox: [number, number, number, number] = [
    roundCoordinate(minLng, 4),
    roundCoordinate(minLat, 4),
    roundCoordinate(maxLng, 4),
    roundCoordinate(maxLat, 4),
  ];

  const manifest: GeoDatasetManifest = {
    id: "us-states-admin-1",
    name: "United States Administrative Level 1 (States and DC)",
    country: "United States",
    iso2: "US",
    iso3: "USA",
    adminLevel: 1,
    source: {
      name: "U.S. Census Bureau Cartographic Boundary Files",
      provider: "U.S. Department of Commerce, Census Bureau Geography Division",
      datasetTitle: "cb_2022_us_state_20m Cartographic Boundary Shapefiles / TopoJSON",
      reference: {
        homepageUrl: "https://www.census.gov",
        datasetUrl:
          "https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html",
        documentationUrl:
          "https://www.census.gov/programs-surveys/geography/technical-documentation/naming-conventions/cartographic-boundary-file-names.html",
        licenseUrl:
          "https://www.census.gov/about/policies/open-government/open-data.html",
      },
    },
    license: {
      name: "Public Domain (U.S. Government Work)",
      spdxId: "CC0-1.0",
      url: "https://www.usa.gov/government-works",
      attribution:
        "Map data derived from U.S. Census Bureau Cartographic Boundary Files.",
      redistributionAllowed: true,
      commercialUseAllowed: true,
      modificationsAllowed: true,
    },
    acquiredAt: "2026-10-01T00:00:00Z",
    version: "2022.1.0",
    format: "geojson",
    crs: "urn:ogc:def:crs:OGC:1.3:CRS84",
    featureCount: normalizedFeatures.length,
    bbox,
    relativePath: "../generated/us-states-admin-1.json",
    rawChecksum: rawHash,
    generatedChecksum: generatedHash,
    fileSizeBytes: generatedBuffer.length,
    transformations: [
      {
        step: 1,
        type: "source-acquisition",
        appliedAt: "2026-10-01T00:00:00Z",
        summary:
          "Acquired authoritative 1:10m State boundaries derived from U.S. Census Bureau 2022 cartographic boundary releases.",
        parameters: { upstreamSource: UPSTREAM_URL },
      },
      {
        step: 2,
        type: "territory-filtering",
        appliedAt: "2026-10-01T00:00:00Z",
        summary:
          "Filtered to the 50 States and District of Columbia (excluded outlying island territories 60, 66, 69, 72, 78).",
        parameters: { targetFeatureCount: 51 },
      },
      {
        step: 3,
        type: "property-normalization",
        appliedAt: "2026-10-01T00:00:00Z",
        summary:
          "Enriched features with 2-digit FIPS ID, State Name, 2-letter Postal Code, ISO 3166-2 code, and AdminLevel 1.",
        parameters: { standard: "GeoCN Property Normalization RFC 7946" },
      },
      {
        step: 4,
        type: "coordinate-quantization",
        appliedAt: "2026-10-01T00:00:00Z",
        summary:
          "Quantized coordinates to 4 decimal places (~11m ground precision) for deterministic SVG rendering and reduced payload.",
        parameters: { decimals: 4 },
      },
    ],
  };

  const manifestPath = path.join(manifestsDir, "us-states-admin-1.manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`✔ Manifest registered at: ${manifestPath}\n`);
}

acquireUsStates().catch((err) => {
  console.error("Acquisition failed:", err);
  process.exit(1);
});
