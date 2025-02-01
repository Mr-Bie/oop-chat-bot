"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/common/button";
import { useSession } from 'next-auth/react';
import Loading from '../common/loading';
import { Message } from '@/models/message';
import Link from 'next/link';
import ConversationButton from './ConversationButton';
import { Conversation } from '@/models/conversation';
import { Icon } from '../common/icon';
import MessageComponent from './MessageComponent';

export default function ChatForm() {
    const { data: session } = useSession();
    const [conversations, setConversations] = useState<Conversation[] | null>(null);
    const [activeConversationId, setActiveConversationId] = useState<Conversation["id"] | null>(null);
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

    const deleteConversation = (id: Conversation["id"]) => {
        setConversations(prev => prev ? prev.filter(v => v.id !== id) : []);
    }

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

        return newConversation;
    }

    const sendMessage = async () => {
        let conversationId = activeConversationId;
        if (!input.trim()) return;

        if (!conversationId) conversationId = (await createConversation())?.id;

        const userMessage = { id: messages[messages.length - 1]?.id + 1 || 1, role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const res = await fetch(`/api/conversations/${conversationId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();

            if (data.reply) setMessages(prev => [...prev, { id: data.id, role: 'bot', content: data.reply.content }]);
        } catch {
            setMessages(prev => [...prev, { id: -1, role: 'bot', content: 'Oops! Something went wrong.' }]);
        }

        if (conversationId) fetchMessages(conversationId);
    };

    if (!session || !conversations) {
        return (
            <Loading />
        );
    }

    return (
        <div className="w-full min-h-screen p-12 flex flex-col items-center">
            <div className="w-full flex justify-between mb-4">
                <Link href="/dashboard"><Button className='flex flex-row-reverse justify-center items-center gap-2'><Icon solid>user</Icon>{session.user.email}</Button></Link>
                <Button onClick={createConversation}>مکالمه جدید</Button>
            </div>

            <div className="w-full overflow-hidden flex">
                <div className="w-1/5 border-r p-2 space-y-2  max-h-96 overflow-auto">
                    {conversations.map(conversation => (
                        <ConversationButton
                            key={conversation.id}
                            conversation={conversation}
                            active={conversation.id === activeConversationId}
                            onClick={() => setActiveConversationId(conversation.id)}
                            onDeleteConversation={deleteConversation}
                        />
                    ))}
                </div>

                <div className="w-4/5 flex flex-col">
                    <div className="flex-grow p-4">
                        <div>
                            <div className="space-y-3 h-96 overflow-y-auto border p-2 rounded bg-gray-50">
                                {messages.map((msg) => (
                                    <MessageComponent key={msg.id} message={msg} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-4 px-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow border rounded-r p-2 outline-none"
                            placeholder="پیامت رو بنویس"
                            onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                        />
                        <Button onClick={sendMessage} className="rounded-r h-full">ارسال</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
