"use client";

import { motion } from "framer-motion";
import { Send, Sparkles, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { aiAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface AISidebarProps {
  selectedText?: string;
}

export default function AISidebar({ selectedText = "" }: AISidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(selectedText);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>("summarize");

  const modes = [
    { id: "summarize", label: "Summarize" },
    { id: "rewrite", label: "Rewrite" },
    { id: "grammar", label: "Grammar Fix" },
    { id: "expand", label: "Expand" },
    { id: "simplify", label: "Simplify" },
    { id: "translate", label: "Translate" },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let response;
      if (selectedMode === "summarize") {
        response = await aiAPI.summarize(input);
      } else if (selectedMode === "grammar") {
        response = await aiAPI.edit(input, "grammar");
      } else if (selectedMode === "rewrite") {
        response = await aiAPI.edit(input, "rewrite");
      } else if (selectedMode === "expand") {
        response = await aiAPI.edit(input, "expand");
      } else if (selectedMode === "simplify") {
        response = await aiAPI.edit(input, "simplify");
      } else if (selectedMode === "translate") {
        response = await aiAPI.translate(input, "es");
      }

      const aiMessage: Message = {
        id: `msg-${Date.now()}`,
        type: "ai",
        content: response?.data?.result || (response && typeof response === "object" && "result" in response ? response.result : "No response"),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Failed to process AI request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 glass-panel p-6 rounded-2xl h-full flex flex-col"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles size={20} className="text-neon-cyan" />
        <h3 className="font-bold text-lg">AI Assistant</h3>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === mode.id
                ? "bg-neon-purple text-white"
                : "glass-button hover:bg-white/20"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-white/60 text-sm py-8">
            <Sparkles size={24} className="mx-auto mb-2 opacity-50" />
            <p>Select text or enter a prompt to get started</p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-neon-purple/30 text-white"
                    : "bg-white/10 text-white/90"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                {msg.type === "ai" && (
                  <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-white/20">
                    <button className="p-1 hover:bg-white/10 rounded transition">
                      <Copy size={14} />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            className="flex justify-start"
          >
            <div className="bg-white/10 px-4 py-3 rounded-lg">
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ delay: i * 0.1 }}
                    className="w-2 h-2 bg-neon-cyan rounded-full"
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm 
                     focus:outline-none focus:border-neon-purple transition-all"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="p-2 rounded-lg bg-neon-purple hover:bg-neon-pink transition-all disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
}
