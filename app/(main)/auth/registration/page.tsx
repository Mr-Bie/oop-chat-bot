'use client';

import Link from 'next/link';
import {
  userRegistrationAction,
} from '@/app/(main)/auth/registration/actions';
import { useToast } from '@/components/common/toast';
import { Input } from '@/components/common/input';
import { useRouter } from 'next/navigation';
import Form from '@/components/common/form';
import {
  emailValidator,
  nameValidator,
  passwordRepeatValidator,
  passwordValidator,
} from '@/lib/validation';
import { handleServerAction } from '@/lib/action';
import { FieldValues } from 'react-hook-form';

export default function Registration() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleSignup = async (data: FieldValues) => {
    await handleServerAction(
      { ...data },
      userRegistrationAction,
      (response) => {
        showToast(response.data);
        router.push('/auth/login');
      },
      (response) => showToast(response.message, 'error')
    );
  };

  return (
    <div className="w-full flex flex-col justify-center px-8 gap-8 lg:px-12 py-6 lg:py-0">
      <div className=''>
        <h1 className="text-4xl font-bold mb-4">ثبت نام</h1>
      </div>
      <div>
        {/* فرم */}
        <Form onSubmit={handleSignup}>
          <Input
            name="name"
            type="text"
            label="نام و نام خانوادگی"
            validation={nameValidator}
          />

          <Input
            label='ایمیل'
            name="email"
            type="text"
            validation={emailValidator}
          />

          <Input
            label='رمز عبور'
            name="password"
            type="password"
            validation={passwordValidator}
            autoComplete="new-password"
          />

          <Input
            label='تکرار رمز عبور'
            name="passwordRepeat"
            type="password"
            validation={passwordRepeatValidator}
            autoComplete="new-password"
          />
        </Form>
      </div>
      {/* لینک‌های ثبت نام */}
      <div className="mt-6 text-center">
        <p className="text-sm">
          حساب کاربری دارید ؟{' '}
          <Link href="/auth/login" className="text-primary">
            ورود به حساب کاربری
          </Link>
        </p>
      </div>
    </div>
  );
}
