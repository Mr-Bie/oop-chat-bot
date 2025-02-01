'use client';

export default function AuthTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center w-full h-full py-6 lg:py-24">
      {/* بخش سمت چپ: فرم ورود */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-8">
        {children}
      </div>
    </div>
  );
}
