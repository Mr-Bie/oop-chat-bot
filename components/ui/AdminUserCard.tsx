'use client';

import Link from 'next/link';
import { Button } from '../common/button';
import { UserInfo } from '@/models/user';

type AdminEventCardProps = {
  user: UserInfo;
};

export default function AdminEventCard({ user }: AdminEventCardProps) {


  return (
    <div><Link href={`/admin/users/${user.id}`}><Button className='flex flex-row'><p>{user.email}</p></Button></Link></div>
  );
}
