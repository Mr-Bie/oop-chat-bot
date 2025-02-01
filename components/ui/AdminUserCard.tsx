'use client';

import Link from 'next/link';
import { Button } from '../common/button';
import { UserInfo } from '@/models/user';

type AdminUserCardProps = {
  user: UserInfo;
};

export default function AdminUserCard({ user }: AdminUserCardProps) {


  return (
    <div className='flex p-2'><Link href={`/admin/users/${user.id}`}><Button className='flex flex-row m-0'><p>{user.email}</p></Button></Link></div>
  );
}
