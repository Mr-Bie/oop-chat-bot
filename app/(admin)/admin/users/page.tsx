import AdminEventCard from '@/components/ui/AdminUserCard';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const users = await prisma.user.findMany({
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">مدیریت کاربران</h1>

      <div className="space-y-6">
        {users.map((user) => (
          <AdminEventCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
