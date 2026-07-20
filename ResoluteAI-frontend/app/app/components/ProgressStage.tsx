"use client";

import { motion } from "framer-motion";

interface ProgressStageProps {
  stage: string;
  label: string;
  icon: string;
  isActive: boolean;
  content?: string;
  sources?: string[];
}

export default function ProgressStage({
  label,
  icon,
  isActive,
  content,
  sources,
}: ProgressStageProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {isActive ? "\u2713" : "\u25CB"}
        </div>
        <span
          className={`text-sm font-medium ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {icon} {label}
        </span>
      </div>

      {isActive && content && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="ml-9 space-y-2"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
          {sources && sources.length > 0 && (
            <div className="space-y-1">
              {sources.map((url, i) => (
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
}
