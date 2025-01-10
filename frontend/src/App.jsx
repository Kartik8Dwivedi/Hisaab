import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Activity, User, BotMessageSquareIcon } from "lucide-react";
import api from "./utility/api";
import ReactMarkdown from "react-markdown";
import Logo from "./components/ui/Logo";
import Prompts from "./components/ui/Prompts";

const MessageBubble = ({ message }) => (
  <div
    className={`flex mb-4 items-start ${
      message.role === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {message.role === "assistant" && (
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-yellow-100 flex items-center justify-center mr-2">
        <BotMessageSquareIcon className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
      </div>
    )}
    <div
      className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm md:text-base ${
        message.role === "user"
          ? "bg-yellow-500 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <ReactMarkdown>{message.content}</ReactMarkdown>
    </div>
    {message.role === "user" && (
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-100 flex items-center justify-center ml-2">
        <User className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
      </div>
    )}
  </div>
);

const LoadingSkeleton = () => (
  <div className="flex items-start space-x-4 mb-4">
    <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
      <BotMessageSquareIcon className="h-6 w-6 text-yellow-500 animate-pulse" />
    </div>
    <div className="space-y-2.5 flex-1">
      <Skeleton className="h-4 w-3/4 bg-gray-200" />
      <Skeleton className="h-4 w-1/2 bg-gray-200" />
    </div>
  </div>
);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = "Hisaab - Your Calculator Bot 🤖";
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/v1/chat", { prompt: input + " Send short, crisp and concise response " });
      if (response.status !== 200)
        throw new Error("Failed to get response from API");

      const { chatbotResponse } = response.data;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: chatbotResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-4">
      <Card className="w-full max-w-3xl border-gray-300 bg-white shadow-2xl">
        <CardHeader className="border-b border-gray-300">
          <Logo />
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <ScrollArea className="h-[50vh] md:h-[60vh] pr-4" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                  <Activity className="h-12 w-12 mb-4 animate-pulse text-yellow-500" />
                  <p className="text-center text-sm md:text-base">
                    Start analyzing data by sending a message
                  </p>
                </div>
                <Prompts onPromptClick={handlePromptClick} />
              </div>
            )}
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && <LoadingSkeleton />}
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-gray-300 p-4 md:p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full space-x-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Analyze your data..."
              className="flex-grow bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded-full p-3 text-sm md:text-base focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Send className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </form>
        </CardFooter>
        <CardFooter className="text-center text-gray-500 text-sm">
          Bot can produce errors. Please refresh & try again.
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
