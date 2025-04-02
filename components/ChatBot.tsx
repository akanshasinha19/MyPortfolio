"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! 👋 I'm Akansha's virtual assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thanks for reaching out! Akansha will get back to you soon.",
        "I'd be happy to tell you more about Akansha's work.",
        "Great question! Akansha specializes in product management and analytics.",
        "Would you like to see Akansha's portfolio projects?",
        "You can contact Akansha directly at akansha.akg19@gmail.com",
      ];

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg"
          variant={isOpen ? "destructive" : "default"}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-5 z-50 w-80 sm:w-96 md:w-[400px] h-96 rounded-lg shadow-xl flex flex-col overflow-hidden bg-background border"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="p-3 border-b bg-muted/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/akansha.PNG" alt="Akansha" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">Chat with Akansha</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleChat}>
                <X size={16} />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {message.sender === "bot" && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/akansha.PNG" alt="Akansha" />
                        <AvatarFallback>
                          <Bot size={14} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <Card className={`p-2 px-3 text-sm ${
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}>
                      {message.text}
                      <div className="text-[10px] opacity-70 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </Card>
                    
                    {message.sender === "user" && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          <User size={14} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-2 max-w-[80%]">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/akansha.PNG" alt="Akansha" />
                      <AvatarFallback>
                        <Bot size={14} />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="p-3 bg-muted">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "100ms" }} />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "200ms" }} />
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
