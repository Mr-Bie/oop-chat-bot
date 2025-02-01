"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/common/button";
import { useSession, signOut } from 'next-auth/react';
import Loading from '../common/loading';
import { Message } from '@/models/message';
import { Icon } from '../common/icon';
import Link from 'next/link';

export default function ChatForm() {
    const { data: session } = useSession();
    const [conversations, setConversations] = useState<{ id: string }[] | null>(null);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchConversations();
    }, [])

    useEffect(() => {
        if (activeConversationId) {
            fetchMessages(activeConversationId);
        }
    }, [activeConversationId]);

    const fetchConversations = async () => {
        const res = await fetch('/api/conversations');
        const data = await res.json();
        setConversations(data);
    };

    const fetchMessages = async (conversationId: number) => {
        const res = await fetch(`/api/conversations/${conversationId}/messages`);
        const data = await res.json();
        setMessages(data);
    };

    const createConversation = async () => {
        const res = await fetch('/api/conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const newConversation = await res.json();
        setConversations([newConversation, ...(conversations || [])]);
        setActiveConversationId(newConversation.id);
    };

    const sendMessage = async () => {
        if (!input.trim() || !activeConversationId) return;

        const userMessage = { id: messages[messages.length - 1]?.id + 1 || 1, role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const res = await fetch(`/api/conversations/${activeConversationId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();
            console.log("message create api response ", data);
            if (data.reply) {
                console.log('salam');
                setMessages(prev => [...prev, { id: data.id, role: 'bot', content: data.reply.content }]);
            }
        } catch {
            setMessages(prev => [...prev, { id: -1, role: 'bot', content: 'Oops! Something went wrong.' }]);
        }
    };

    if (!session || !conversations) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex justify-between mb-4">
                <Link href="/dashboard"><Button onClick={() => signOut()}><Icon className='text-white' solid>user</Icon></Button></Link>
                <Button onClick={createConversation}>New Conversation</Button>
            </div>

            <div className="w-full max-w-md flex">
                <div className="w-1/3 border-r p-2 space-y-2">
                    {conversations.map(conversation => (
                        <div
                            key={conversation.id}
                            className={`p-2 cursor-pointer ${conversation.id === activeConversationId ? 'bg-blue-200' : 'bg-gray-100'}`}
                            onClick={() => setActiveConversationId(conversation.id)}
                        >
                            Conversation {conversation.id}
                        </div>
                    ))}
                </div>

                <div className="w-2/3 flex flex-col">
                    <div className="flex-grow p-4">
                        <div>
                            <div className="space-y-3 h-96 overflow-y-auto border p-2 rounded bg-gray-50">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`text-${msg.role === 'bot' ? 'left' : 'right'}`}>
                                        <span className={`block p-2 rounded ${msg.role === 'bot' ? 'bg-blue-100' : 'bg-green-100'}`}>{msg.content}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow border rounded-l p-2"
                            placeholder="Type your message..."
                        />
                        <Button onClick={sendMessage} className="rounded-r">Send</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
