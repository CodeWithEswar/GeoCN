"use client";

import * as React from "react";
import { Check, Copy, Laptop, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentPreviewProps {
  readonly title: string;
  readonly description?: string;
  readonly code: string;
  readonly children: React.ReactNode;
  readonly emptyState?: React.ReactNode;
  readonly errorState?: React.ReactNode;
}

export function ComponentPreview({
  title,
  description,
  code,
  children,
  emptyState,
  errorState,
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [widthMode, setWidthMode] = React.useState<"100%" | "768px" | "375px">("100%");
  const [simulatedState, setSimulatedState] = React.useState<
    "default" | "empty" | "error"
  >("default");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 flex flex-col rounded-lg border border-zinc-200 bg-background shadow-xs dark:border-zinc-800">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </span>
          {description ? (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              — {description}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {/* Responsive Width Toggles (only visible in preview tab) */}
          {tab === "preview" ? (
            <div className="hidden sm:flex items-center rounded-md border border-zinc-200 bg-zinc-50/80 p-0.5 dark:border-zinc-800 dark:bg-zinc-900/80">
              <button
                type="button"
                onClick={() => setWidthMode("100%")}
                className={cn(
                  "rounded px-2 py-1 text-xs transition-colors",
                  widthMode === "100%"
                    ? "bg-white font-medium text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
                title="Full Container Width"
              >
                <Laptop className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setWidthMode("768px")}
                className={cn(
                  "rounded px-2 py-1 text-xs transition-colors",
                  widthMode === "768px"
                    ? "bg-white font-medium text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
                title="Tablet Container Width (768px)"
              >
                <Tablet className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setWidthMode("375px")}
                className={cn(
                  "rounded px-2 py-1 text-xs transition-colors",
                  widthMode === "375px"
                    ? "bg-white font-medium text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
                title="Mobile Container Width (375px)"
              >
                <Smartphone className="size-3.5" />
              </button>
            </div>
          ) : null}

          {/* State Simulation (Default / Empty / Error) */}
          {tab === "preview" && (emptyState || errorState) ? (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSimulatedState("default")}
                className={cn(
                  "rounded px-2 py-1 text-[11px] font-mono transition-colors",
                  simulatedState === "default"
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                default
              </button>
              {emptyState ? (
                <button
                  type="button"
                  onClick={() => setSimulatedState("empty")}
                  className={cn(
                    "rounded px-2 py-1 text-[11px] font-mono transition-colors",
                    simulatedState === "empty"
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  )}
                >
                  empty
                </button>
              ) : null}
              {errorState ? (
                <button
                  type="button"
                  onClick={() => setSimulatedState("error")}
                  className={cn(
                    "rounded px-2 py-1 text-[11px] font-mono transition-colors",
                    simulatedState === "error"
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  )}
                >
                  error
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Tab Selection */}
          <div className="flex items-center rounded-md border border-zinc-200 bg-zinc-50/80 p-0.5 dark:border-zinc-800 dark:bg-zinc-900/80">
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={cn(
                "rounded px-2.5 py-1 text-xs transition-colors",
                tab === "preview"
                  ? "bg-white font-medium text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setTab("code")}
              className={cn(
                "rounded px-2.5 py-1 text-xs transition-colors",
                tab === "code"
                  ? "bg-white font-medium text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              Code
            </button>
          </div>
        </div>
      </div>

      {/* Content Canvas */}
      {tab === "preview" ? (
        <div className="geo-graticule-bg relative flex min-h-[350px] w-full items-center justify-center overflow-x-auto p-4 sm:p-8">
          <div
            style={{ width: widthMode, maxWidth: "100%" }}
            className="flex items-center justify-center transition-all duration-200"
          >
            {simulatedState === "default" && children}
            {simulatedState === "empty" && (emptyState ?? children)}
            {simulatedState === "error" && (errorState ?? children)}
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            aria-label="Copy source code"
            title="Copy source code"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="max-h-[420px] overflow-auto rounded-b-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
