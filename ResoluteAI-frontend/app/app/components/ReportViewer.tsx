"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface ReportViewerProps {
  content: string;
}

export default function ReportViewer({ content }: ReportViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      className="rounded-2xl bg-card border border-border overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border bg-secondary/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-muted-foreground">ResoluteAI Report</span>
      </div>
      <div className="px-6 py-5 max-w-none prose prose-sm prose-invert prose-headings:text-foreground prose-a:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}
