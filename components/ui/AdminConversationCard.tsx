'use client';

import Link from 'next/link';
import { Button } from '../common/button';
import { Conversation } from '@/models/conversation';

type AdminEventCardProps = {
  conversation: Conversation;
};

export default function AdminConversationCard({ conversation }: AdminEventCardProps) {


  return (
    <div><Link href={`/admin/conversation/${conversation.id}`}><Button className='flex flex-row'><p>{conversation.title || conversation.id}</p></Button></Link></div>
  );
}
