'use client';
import { useToast } from '@/components/common/toast';
import { Input } from '@/components/common/input';
import { useRouter } from 'next/navigation';
import Form from '@/components/common/form';
import {
  passwordValidator,
  emailValidator,
} from '@/lib/validation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { ACTION_RESPONSE_MESSAGES } from '@/constants/ui';

export default function LoginPage() {
  const { showToast } = useToast();
  const router = useRouter();

  const handleLogin = async (data: FieldValues) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...data,
      });
      console.log('result ', result);

      if (result?.error) {
        showToast(ACTION_RESPONSE_MESSAGES.BAD_REQUEST, 'error');
        return;
      }

      showToast(ACTION_RESPONSE_MESSAGES.LOGIN_SUCCESSFUL);

      router.push('/');
    } catch (err) {
      console.log('errror', err);
      showToast('An unexpected error occurred', 'error');
    }
  };

  return (
    <div className="w-full flex flex-col justify-center px-8 lg:px-12 py-6 lg:py-0">
      <h1 className="text-4xl font-bold mb-4">خوش آمدید</h1>
      <div className="flex flex-row gap-2 items-center text-center mb-4">
        <h2 className="text-lg">ورود به حساب کاربری</h2>
      </div>
      {/* فرم */}
      <Form onSubmit={handleLogin}>
        <Input
          label='ایمیل'
          name="email"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-right"
          validation={emailValidator}
          inputMode="tel"
        />
        <Input
          label='رمز عبور'
          name="password"
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-right"
          validation={passwordValidator}
        />
      </Form>
      {/* لینک‌های ثبت نام */}
      <div className="mt-6 text-center">
        <p className="text-sm flex gap-2 justify-center">
          حساب کاربری ندارید؟
          <Link href="/auth/registration" className="text-primary">
            ثبت نام
          </Link>
        </p>
      </div>
    </div>
  );
}
