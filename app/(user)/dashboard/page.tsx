import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { notFound } from 'next/navigation';
import { getUserInfo } from '@/models/user';
import UserProfileForm from '@/components/ui/UserProfileForm';

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) notFound();

  const user = await getUserInfo(session.user.id);

  if (!user) notFound();

  return (
    <div className="bg-background p-6 rounded-lg shadow-md mb-6">
      <h1 className="text-2xl font-bold mb-4">پروفایل من</h1>
      <UserProfileForm user={user} />
    </div>
  );
}
