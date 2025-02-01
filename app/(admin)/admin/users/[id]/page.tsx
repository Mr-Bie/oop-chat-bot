import AdminConversationCard from "@/components/ui/AdminConversationCard";
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export default async function UserConversations({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = decodeURIComponent((await params).id);

    console.log('user id', id);

    const conversations = await prisma.conversation.findMany({
        where: { userId: Number(id) }
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">مدیریت مکالمه ها</h1>

            <div className="space-y-6">
                {conversations.map((con) => (
                    <AdminConversationCard key={con.id} conversation={con} />
                ))}
            </div>
        </div>
    );
}