import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatIcon, SendIcon } from '../constants.tsx';
import { ChatMessage } from '../types.ts';
import { getChatResponse } from '../services/geminiService.ts';

const TypingIndicator: React.FC = () => (
    <div className="chat-message model typing">
        <span></span>
        <span></span>
        <span></span>
    </div>
);

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: "أهلاً بك في متجر قطع الغيار! أنا مساعدك الذكي، كيف أقدر أخدمك اليوم؟" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await getChatResponse(messages, inputValue);
            const modelMessage: ChatMessage = { role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', content: "عفواً، حدث خطأ ما. حاول مرة أخرى." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-widget">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="chat-popup"
                    >
                        <header className="p-4 bg-slate-800 border-b border-slate-700 text-center">
                            <h3 className="font-bold text-white text-xl whitespace-nowrap">مساعد قطع الغيار الذكي</h3>
                        </header>
                        <main className="flex-1 p-6 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`chat-message ${msg.role} text-base`}>{msg.content}</div>
                                </div>
                            ))}
                             {isLoading && <div className="flex justify-start"><TypingIndicator /></div>}
                            <div ref={messagesEndRef} />
                        </main>
                        <footer className="p-2 border-t border-slate-700">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="اكتب رسالتك هنا..."
                                    className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-full py-3 px-4 focus:ring-1 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] focus:outline-none transition-colors duration-200 text-slate-200 placeholder-slate-500 text-base"
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={isLoading || !inputValue.trim()} className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
                                    <SendIcon className="w-6 h-6"/>
                                </button>
                            </form>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-20 h-20 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-[color:var(--color-primary)]/40"
            >
                <ChatIcon className="w-9 h-9"/>
            </motion.button>
        </div>
    );
};

export default ChatAssistant;