"use client";

import { motion } from "framer-motion";
import type { StageData } from "@/app/page";

const stageLabels: Record<string, string> = { plan: "Plan", research: "Research", analysis: "Analysis", report: "Report" };
const stageIcons: Record<string, string> = { plan: "\u{1F9E0}", research: "\u{1F50D}", analysis: "\u{1F4CA}", report: "\u{1F4C4}" };

interface RightSidebarProps {
  stages: StageData[];
  report: string;
  onClose: () => void;
}

export default function RightSidebar({ stages, report, onClose }: RightSidebarProps) {
  const stageOrder = ["plan", "research", "analysis", "report"];

  return (
    <motion.aside
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      exit={{ x: 320 }}
      transition={{ type: "spring", damping: 25, stiffness: 250 }}
      className="w-80 h-full bg-sidebar border-l border-border flex flex-col shrink-0 absolute md:relative right-0 z-20"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Progress</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {stages.length === 0 && !report && (
          <div className="text-center text-muted-foreground text-sm py-8">
            Run a research to see progress here.
          </div>
        )}

        {stageOrder.map((stageKey) => {
          const stage = stages.find((s) => s.stage === stageKey);
          return (
            <div key={stageKey} className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors ${
                    stage
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {stage ? "\u2713" : stageOrder.indexOf(stageKey) + 1}
                </div>
                <span className={`text-sm font-medium ${stage ? "text-foreground" : "text-muted-foreground"}`}>
                  {stageIcons[stageKey]} {stageLabels[stageKey]}
                </span>
              </div>

              {stage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="ml-9 space-y-2"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed">{stage.content}</p>
                  {stage.sources && stage.sources.length > 0 && (
                    <div className="space-y-1">
                      {stage.sources.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-2 py-1 rounded text-xs text-primary hover:underline truncate bg-primary/5"
                        >
                          {url}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          );
        })}

        {report && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 border-t border-border"
          >
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Report
            </button>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
