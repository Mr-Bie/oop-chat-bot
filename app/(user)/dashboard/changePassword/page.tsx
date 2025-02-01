'use client';

import Form from '@/components/common/form';
import { Input } from '@/components/common/input';
import { handleServerAction } from '@/lib/action';
import { passwordRepeatValidator, passwordValidator } from '@/lib/validation';
import { FieldValues } from 'react-hook-form';
import { editUserPasswordAction } from '../action';
import { useToast } from '@/components/common/toast';
import { signOut } from 'next-auth/react';

export default function ChangePassword() {
  const { showToast } = useToast();

  const handleSubmit = async (data: FieldValues) => {
    await handleServerAction(
      data,
      editUserPasswordAction,
      (response) => {
        showToast(response.data as string, 'success');
        signOut({ callbackUrl: '/auth/login' });
      },
      (response) => showToast(response.message, 'error')
    );
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow-md mb-6">
      <h1 className="text-2xl font-bold mb-4">تغییر رمز عبور</h1>

      {/* فرم برای تغییر رمز عبور */}
      <Form onSubmit={handleSubmit}>
        {/* فیلد رمز عبور */}
        <div>
          <Input
            name="password"
            type="password"
            autoComplete="new-password"
            validation={passwordValidator}
            label="رمز عبور جدید"
          />
        </div>

        {/* فیلد تکرار رمز عبور */}
        <div>
          <Input
            name="passwordRepeat"
            type="password"
            validation={passwordRepeatValidator}
            label="تکرار رمز عبور جدید"
            autoComplete="new-password"
          />
        </div>
      </Form>
    </div>
  );
}
