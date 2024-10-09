'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-full max-w-md mx-auto h-screen bg-[#f5f5dc]">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#f5f5dc] rounded-t-lg">
                {messages.map(m => (
                    <div
                        key={m.id}
                        className={`whitespace-pre-wrap p-3 rounded-lg max-w-sm ${
                            m.role === 'user' ? 'bg-green-900 text-white self-end' : 'bg-green-600 text-black self-start'
                        }`}
                    >
                        {m.content}
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>

            <form onSubmit={handleSubmit} className="flex border-t border-gray-300">
                <input
                    className="w-full p-3 text-black placeholder-gray-600 rounded-bl-lg focus:outline-none h-12"
                    value={input}
                    placeholder="Type your message..."
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 rounded-br-lg h-12 hover:bg-green-700 transition duration-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
}