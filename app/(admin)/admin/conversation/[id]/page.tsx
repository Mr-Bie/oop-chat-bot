import MessageComponent from "@/components/ui/MessageComponent";
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export default async function UserConversations() {
    const conversations = await prisma.conversation.findFirst({
        select: {
            messages: true
        }
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">مدیریت چت ها</h1>

            <div className="space-y-2 border-primary border-solid border-2 rounded-sm p-4 max-h-96 overflow-auto">
                {conversations?.messages.map((msg) => (
                    <MessageComponent key={msg.id} message={msg} />
                ))}
            </div>
        </div>
    );
}