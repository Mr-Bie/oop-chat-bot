import AdminUserCard from '@/components/ui/AdminUserCard';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const users = await prisma.user.findMany({
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">مدیریت کاربران</h1>

      <div className="flex flex-row flex-wrap">
        {users.map((user) =>
          <AdminUserCard key={user.id} user={{ ...user, id: Number(user.id) }} />
        )}
      </div>
    </div>
  );
}
