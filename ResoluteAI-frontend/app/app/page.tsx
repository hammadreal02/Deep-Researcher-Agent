"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LeftSidebar from "@/app/components/LeftSidebar";
import CenterChat from "@/app/components/CenterChat";
import RightSidebar from "@/app/components/RightSidebar";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface StageData {
  stage: "plan" | "research" | "analysis" | "report";
  content: string;
  sources?: string[];
}

export interface Conversation {
  id: string;
  query: string;
  timestamp: number;
  stages: StageData[];
  report?: string;
  messages: Message[];
}

export interface SavedReport {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export default function Home() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stages, setStages] = useState<StageData[]>([]);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const handleNewChat = useCallback(() => {
    if (isResearching) return;
    setMessages([]);
    setStages([]);
    setReport("");
    setError("");
  }, [isResearching]);

  const handleSendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isResearching) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsResearching(true);
    setError("");
    setRightOpen(true);

    try {
      const response = await fetch("http://localhost:8000/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.stage) {
              setStages((prev) => {
                const existing = prev.find((s) => s.stage === data.stage);
                if (existing) {
                  return prev.map((s) =>
                    s.stage === data.stage ? { ...s, ...data } : s
                  );
                }
                return [...prev, data];
              });
            }
            if (data.report) {
              setReport(data.report);
              setMessages((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: "Research complete! The report is ready on the right.",
                },
              ]);
            }
          } catch {
            // skip
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: `Error: ${msg}` },
      ]);
    } finally {
      setIsResearching(false);
    }
  }, [isResearching]);

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <AnimatePresence>
        {leftOpen && (
          <LeftSidebar
            onNewChat={handleNewChat}
            onClose={() => setLeftOpen(false)}
          />
        )}
      </AnimatePresence>

      <CenterChat
        messages={messages}
        isResearching={isResearching}
        error={error}
        report={report}
        onSendMessage={handleSendMessage}
        onToggleLeft={() => setLeftOpen((prev) => !prev)}
        onToggleRight={() => setRightOpen((prev) => !prev)}
        leftOpen={leftOpen}
        rightOpen={rightOpen}
      />

      <AnimatePresence>
        {rightOpen && (
          <RightSidebar
            stages={stages}
            report={report}
            onClose={() => setRightOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
