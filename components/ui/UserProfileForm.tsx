'use client';

import Link from 'next/link';
import { UserInfo } from '@/models/user';
import { handleServerAction } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useToast } from '../common/toast';
import { editUserProfileAction } from '@/app/(user)/dashboard/action';
import { Input } from '../common/input';
import Form from '../common/form';

type UserProfileFormProps = {
  user: UserInfo;
};

export default function UserProfileForm({ user }: UserProfileFormProps) {
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    data['id'] = user.id;
    console.log('admin upload new event data : ', data);

    await handleServerAction(
      data,
      editUserProfileAction,
      (response) => {
        showToast(response.data, 'success');
        router.refresh();
      },
      (response) => showToast(response.message, 'error')
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      submitText="ذخیره تغییرات"
      className="space-y-4"
      defaultValues={user}
    >
      {/* نام و نام خانوادگی */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <Input
            label="نام و نام خانوادگی"
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>


      {/* ایمیل - فقط خواندنی */}
      <div>
        <div className="flex justify-between items-center">
          <Input
            label='ایمیل'
            type="text"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {/* <Link
          href="profile/changeEmail"
          className="text-blue-600 underline mx-4"
        >
          تغییر
        </Link> */}
        </div>
      </div>

      {/* رمز عبور - فقط خواندنی */}
      <div>
        <Link href="dashboard/changePassword" className="text-blue-600 underline">
          تغییر رمز عبور
        </Link>
      </div>
    </Form>
  );
}
