"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Mail, Loader2, Paperclip, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChatModule } from "@mlc-ai/web-llm";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
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
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState<EmailFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // WebLLM state
  const [model, setModel] = useState<ChatModule | null>(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modelError, setModelError] = useState<string | null>(null);

  // Initialize WebLLM when the chat opens
  useEffect(() => {
    if (isOpen && !model && !modelLoading && !modelError) {
    }
  }, [isOpen, model, modelLoading, modelError]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check if user wants to get in touch
    if (input.toLowerCase().includes("contact") || 
        input.toLowerCase().includes("email") || 
        input.toLowerCase().includes("get in touch")) {
      showGetInTouchOption();
      return;
    }

    // Add user messaw
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

    try {
      let responseText = "";
      
      // Use WebLLM if available
      if (model) {
        const response = await model.generate(input, { max_gen_len: 256 });
        responseText = response.trim();
      } else {
        // Fallback to predefined responses
        const botResponses = [
          "Thanks for reaching out! Akansha will get back to you soon.",
          "I'd be happy to tell you more about Akansha's work.",
          "Great question! Akansha specializes in product management and analytics.",
          "Would you like to see Akansha's portfolio projects?",
          "You can contact Akansha directly at akansha.akg19@gmail.com",
        ];
        responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Error handling response
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const showGetInTouchOption = () => {
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

    // Show email form option
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "Would you like to send Akansha an email? I can help you with that!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setShowEmailForm(true);
      setEmailSent(false); // Reset email sent state
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value
    });
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Here you would typically send the email data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      
      // Add confirmation message after a short delay to show the animation
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 1,
          text: `Thanks ${emailData.name}! Your message has been sent to Akansha. She'll get back to you at ${emailData.email} soon.`,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Hide the email form after another short delay
        setTimeout(() => {
          setShowEmailForm(false);
          
          // Reset form
          setEmailData({
            name: "",
            email: "",
            subject: "",
            message: ""
          });
        }, 1000);
      }, 1500);
      
    } catch (error) {
      // Handle errors
      const errorMessage: Message = {
        id: messages.length + 1,
        text: "Sorry, there was an error sending your message. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setEmailSent(false);
    } finally {
      setIsSending(false);
    }
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
              {modelLoading && (
                <motion.div
                  className="flex justify-center w-full mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="p-3 bg-muted/30 w-full">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm font-medium">Loading AI assistant...</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${loadingProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{loadingProgress}%</p>
                    </div>
                  </Card>
                </motion.div>
              )}

              {modelError && (
                <motion.div
                  className="flex justify-center w-full mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="p-3 bg-destructive/10 w-full">
                    <p className="text-sm text-destructive text-center">{modelError}</p>
                  </Card>
                </motion.div>
              )}

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

              {showEmailForm && (
                <motion.div
                  className="flex justify-start w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-3 w-full bg-card border shadow-md">
                    {!emailSent ? (
                      <form onSubmit={submitEmail} className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <h3 className="font-medium text-sm">New Message</h3>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => setShowEmailForm(false)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b pb-2">
                            <Label htmlFor="to" className="text-xs font-medium w-16">To:</Label>
                            <div className="flex-1 text-xs text-muted-foreground">akansha.akg19@gmail.com</div>
                          </div>
                          
                          <div className="flex items-center gap-2 border-b pb-2">
                            <Label htmlFor="from" className="text-xs font-medium w-16">From:</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={emailData.email}
                              onChange={handleEmailChange}
                              placeholder="your.email@example.com"
                              required
                              className="h-7 text-xs border-0 p-0 focus-visible:ring-0"
                            />
                          </div>
                          
                          <div className="flex items-center gap-2 border-b pb-2">
                            <Label htmlFor="name" className="text-xs font-medium w-16">Name:</Label>
                            <Input
                              id="name"
                              name="name"
                              value={emailData.name}
                              onChange={handleEmailChange}
                              placeholder="Your name"
                              required
                              className="h-7 text-xs border-0 p-0 focus-visible:ring-0"
                            />
                          </div>
                          
                          <div className="flex items-center gap-2 border-b pb-2">
                            <Label htmlFor="subject" className="text-xs font-medium w-16">Subject:</Label>
                            <Input
                              id="subject"
                              name="subject"
                              value={emailData.subject}
                              onChange={handleEmailChange}
                              placeholder="Message subject"
                              required
                              className="h-7 text-xs border-0 p-0 focus-visible:ring-0"
                            />
                          </div>
                          
                          <div className="pt-1">
                            <Textarea
                              id="message"
                              name="message"
                              value={emailData.message}
                              onChange={handleEmailChange}
                              placeholder="Type your message here..."
                              required
                              className="text-xs min-h-[80px] resize-none border-0 focus-visible:ring-0 p-0"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-1">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            className="text-xs h-8 px-2"
                          >
                            <Paperclip size={12} className="mr-1" />
                            Attach
                          </Button>
                          
                          <Button 
                            type="submit" 
                            size="sm"
                            disabled={isSending}
                            className="text-xs h-8 px-3 flex gap-2 items-center"
                          >
                            {isSending ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send size={12} />
                                Send Email
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <motion.div 
                        className="flex flex-col items-center justify-center py-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <motion.div 
                          className="bg-primary text-primary-foreground rounded-full p-3 mb-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                        >
                          <Check size={24} />
                        </motion.div>
                        <h3 className="text-lg font-semibold mb-1">Email Sent!</h3>
                        <p className="text-sm text-center text-muted-foreground">
                          Your message has been sent to Akansha.
                        </p>
                      </motion.div>
                    )}
                  </Card>
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
