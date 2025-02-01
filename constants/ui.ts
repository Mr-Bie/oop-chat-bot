import { ROUTES } from "./config";

export const HEADER_STATIC_LINKS: { name: string; href: string }[] = [
  {
    name: "خرید ماشین مجازی",
    href: ROUTES.VPS.BUY,
  },
  { name: "لیست قیمت ها", href: ROUTES.VPS.PRICE },
  { name: "خدمات ما", href: ROUTES.SERVICES.BASE },
  { name: "درباره ما", href: ROUTES.ABOUT },
  { name: "بلاگ", href: ROUTES.BLOG },
];

export const HEADER_SIGNIN_BUTTON = "ثبت نام / ورود";
export const HEADER_DASHBOARD_BUTTON = "ورود به داشبورد";
export const HOME_HEADER = "چرا ماشین مجازی آزمایشگاه مرکزی؟";
export const HOME_DESCRIPTION =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.";
export const HOME_BUY_BUTTON = "خرید";
export const HOME_PRICE_LIST = "لیست قیمت ها";
export const HOME_POINTS: { text: string; icon: string }[] = [
  {
    text: "ثبت سفارش در کمتر از 10 دقیقه",
    icon: "timer",
  },
  {
    text: "اختصاص سرور در کمتر از 1 ساعت",
    icon: "check-circle",
  },
  { text: "پرداخت آنلاین / کسر از گرنت", icon: "wallet" },
];

export const HOME_SERVICES_TITLE = "خدمات ما";
export const HOME_SERVICES: {
  title: string;
  description: string;
  icon: string;
  href: string;
}[] = [
  {
    title: "سرور مجازی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.",
    icon: "server",
    href: ROUTES.SERVICES.VPS,
  },
  {
    title: "پشتیبانی آنلاین",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.",
    icon: "support",
    href: ROUTES.SERVICES.SUPPORT,
  },
];
export const HOME_SERVICES_MORE_INFO = "اطلاعات بیشتر";
export const HOME_BUY_VPS_TITLE = "مراحل خرید سرور مجازی";
export const HOME_BUY_VPS_PLANS = "اشتراک ها و هزینه ها";
export const HOME_FOOTER_RIGHTS =
  "کلیه حقوق این سایت متعلق به دانشگاه خوارزمی میباشد.";
export const HOME_FOOTER_ADDRESS =
  "آدرس : تهران ، پونک ، ایران زمین شمالی ، اعلایی یک";
export const HOME_FOOTER_TEL = "شماره پشتیبانی : 09378805665";
export const HOME_FOOTER_LINKS_TITLE = "دسترسی های سایت";
export const HOME_FOOTER_LINKS: { text: string; href: string }[] = [
  { text: "درباره ما", href: ROUTES.ABOUT },
  { text: "خرید اشتراک", href: ROUTES.VPS.BUY },
  { text: "بلاگ ها", href: ROUTES.BLOG },
];
export const HOME_FOOTER_EMAIL = "Support@khu.server.ir";

export const SIGNIN_FORM = {
  SUBMIT_BUTTON: "ورود",
  EMAIL_LABEL: "ایمیل",
  PASSWORD_LABEL: "رمز عبور",
  CAPTCHA_LABEL: "کد امنیتی",
  SWITCH_SIGN_UP_TEXT: "ثبت نام نکرده اید؟ ",
  SWITCH_SIGNUP_LINK_TEXT: "ثبت نام",
  FORGOT_PASSWORD_LINK_TEXT: "فراموشی رمز عبور",
};

export const SIGNUP_FORM = {
  SUBMIT_SEND_OTP_BUTTON: "ارسال کد یکبار مصرف",
  SUBMIT_SIGNUP_BUTTON: "تایید",
  EMAIL_LABEL: "ایمیل",
  CAPTCHA_LABEL: "کد امنیتی",
  OTP_LABEL: "کد ارسال شده",
  SWITCH_SIGN_IN_TEXT: "ثبت نام کرده اید؟ ",
  SWITCH_SIGNIN_LINK_TEXT: "ورود",
};

export const SIGNUP_COMPLETE_FORM = {
  PASSWORD: "رمز عبور",
  CONFIRM_PASSWORD: "تکرار رمز عبور",
};

export const USER_PROFILE_FORM = {
  FIRST_NAME: "نام",
  LAST_NAME: "نام خانوادگی",
  PHONE_NUMBER: "شماره همراه",
  NATIONAL_ID: "کد ملی",
};

export const USER_DASHBOARD = {
  ROOT_LINK_TEXT: "داشبورد",
  PROFILE_LINK_TEXT: "پروفایل",
  MY_VPS: "سرورهای فعال",
  BUY: "خرید سرور",
  LOGOUT: "خروج",
};

export const ADMIN_DASHBOARD = {
  ROOT_LINK_TEXT: "داشبورد",
  ALL_VPS: "سرورها",
  CREATE_VPS: "اضافه کردن سرور",
  LOGOUT: "خروج",
};

export const PLANS = {
  TITLE: "نام سرویس",
  RAM: { TEXT: "رم", UNIT: "GB" },
  CPU: { TEXT: "سی پی یو", UNIT: "" },
  STORAGE: { TEXT: "هارد", UNIT: "GB" },
  DURATION: { TEXT: "تعداد روز اشتراک", UNIT: "روز" },
  PRICE: "قیمت (تومان)",
};

export const CURRENCY_TEXT = "تومان";

export const CHECKOUT_FORM = {
  PRICE_TEXT: "مبلغ قابل پرداخت",
  PAY_BUTTON: "پرداخت",
  DISCOUNT_LABEL: "کد تخفیف",
  DISCOUNT_PLACEHOLDER: "کد تخفیف خود را وارد کنید",
  DISCOUNT_SUBMIT: "ثبت",
};

export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: "وارد کردن ایمیل اجباری است",
  EMAIL_INVALID: "ایمیل وارد شده اشتباه است",
  PASSWORD_MIN_LENGTH: "حداقل طول رمز عبور 8 کاراکتر است",
  PASSWORD_REQUIRED: "وارد کردن رمز اجباری است",
  PASSWORD_REPEAT_INVALID: "تکرار رمز اشتباه است",
  CAPTCHA_REQUIRED: "وارد کردن کد امنیتی اجباری است",
  FIRST_NAME_SHORT: "نام وارد شده کوتاه است",
  LAST_NAME_SHORT: "نام خانوادگی وارد شده کوتاه است",
  PHONE_NUMBER_REQUIRED: "وارد کردن شماره همراه اجباری است",
  PHONE_NUMBER_INVALID: "شماره همراه اشتباه می باشد",
  NATIONAL_ID_REQUIRED: "وارد کردن کد ملی اجباری است",
  NATIONAL_ID_INVALID: "کد ملی اشتباه می باشد",
};

export const TOAST_MESSAGES = {
  SUCCESSFUL_REQUEST_DEFAULT_MESSAGE: "درخواست با موفقیت انجام شد",
  FAILED_REQUEST_DEFAULT_MESSAGE: "درخواست با مشکل مواجه شد",
  LOGGED_IN_SUCCESS: "با موفقیت وارد شدید",
  PROFILE_NOT_COMPLETED: "لطفا پروفایل خود را تکمیل کنید",
};

export const API_MESSAGES = {
  LOGOUT: "با موفقیت خارج شدید",
};

export const ACTION_RESPONSE_MESSAGES = {
  BAD_REQUEST: "اطلاعات ارسال شده اشتباه می باشد",
  USER_NOT_EXISTS: "کاربری با این اطلاعات یافت نشد",
  USER_ALREADY_EXISTS: "کاربری با این اطلاعات یافت شد",
  OTP_NOT_EXPIRED: "کد یکبار مصرف قبلی منقضی نشده است",
  OTP_SENT: "کد یکبار مصرف ارسال شد",
  OTP_EXPIRED: "کد یکبار مصرف منقضی شده است",
  SIGNUP_SUCCESSFUL: "ثبت نام شما با موفقیت انجام شد",
  LOGIN_SUCCESSFUL: "ورود شما با موفقیت انجام شد",
  UNAUTHORIZED: "شما به این بخش دسترسی ندارید",
  SUCCESS: "عملیات با موفقیت انجام شد",
  FAILED: "مشکلی رخ داده است",
};
