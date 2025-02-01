'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/button';
import { signOut } from 'next-auth/react';
import { Icon } from '@/components/common/icon';

export default function UserPanelTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* هدر فقط در حالت موبایل */}
      <header className="lg:hidden w-full bg-background fixed top-0 left-0 z-50 shadow-md p-4 flex justify-between items-center">
        {/* دکمه همبرگری (سه خط) در سمت راست */}
        <SideBarLink
          href=""
          icon="menu"
          text=""
          onClick={toggleSidebar}
          iconColor="black"
        />
      </header>
      {/* فضای خالی برای جای دادن هدر در حالت موبایل */}
      <div className="mt-16 lg:mt-0"></div>{' '}
      {/* فاصله‌ای برای جابجا کردن محتوا در حالت موبایل */}
      {/* نوار کناری (Sidebar) */}
      <aside
        className={`${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } fixed top-0 right-0 z-40 w-64 bg-gray-100 shadow-md p-4 h-screen lg:static lg:translate-x-0 lg:w-1/5 lg:h-screen lg:sticky lg:top-0 transition-transform duration-300 lg:mx-6 rounded-lg mt-16 lg:mt-6`}
      >
        <nav className="space-y-1">
          <SideBarLink
            href="/"
            icon="menu"
            text="بازگشت به چت"
            onClick={() => setSidebarOpen(false)}
          />
          <SideBarLink
            href="/admin/users"
            icon="menu"
            text="کاربران"
            onClick={() => setSidebarOpen(false)}
          />
          <SideBarLink
            href=""
            icon="log-out"
            text="خروج از حساب"
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
          />
        </nav>
      </aside>
      {/* بخش اصلی صفحه */}
      <main className="flex-grow bg-gray-100 p-6 lg:max-w-[80%] rounded-lg lg:ml-6 shadow-md overflow-auto mt-16 lg:mt-6">
        {' '}
        {/* فاصله محتوا از هدر */}
        {children}
      </main>
    </div>
  );
}

function SideBarLink({
  href,
  icon,
  text,
  onClick,
  iconColor = 'primary',
}: {
  href: string;
  icon: string;
  text: string;
  onClick: () => void;
  iconColor?: string;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <Button
        variant="ghost"
        className="w-full justify-start text-base text-black text-right font-normal flex items-center gap-3 px-4 py-6 rounded-lg hover:bg-gray-200 transition"
      >
        <Icon size="sm" className={`text-${iconColor}`}>
          {icon}
        </Icon>
        {text}
      </Button>
    </Link>
  );
}
