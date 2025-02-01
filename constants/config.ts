export const ROUTES = {
  HOME: "/",
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
  SERVICES: {
    BASE: "/services",
    VPS: "/services/vps",
    SUPPORT: "/services/support",
  },
  ABOUT: "/about",
  BLOG: "/blog",
  VPS: { PRICE: "/vps/price", BUY: "/vps/buy" },
  USER_DASHBOARD: {
    ROOT: "/user/dashboard",
    PROFILE: "/user/dashboard/profile",
    MY_VPS: "/user/dashboard/vps",
    BUY: "/user/dashboard/buy",
    BUY_FINAL: "/user/dashboard/buy/",
  },
  ADMIN_DASHBOARD: {
    ROOT: "/admin/dashboard",
    ALL_VPS: "/admin/dashboard/vps",
    CREATE_VPS: "/admin/dashboard/vps/create",
    EDIT_VPS_BASE: "/admin/dashboard/vps/edit/",
  },
};

export const AUTH_CONFIG = {
  PASSWORD: { MIN_LENGTH: 8 },
  OTP: { LENGTH: 6 },
};

export const API_URLS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/login",
    VERIFY: "/auth/verify",
    NEXT_SIGNIN: "api/auth/signin",
    NEXT_VERIFY_OTP: "api/auth/verify",
    NEXT_LOGOUT: "api/auth/logout",
  },
  USER: {
    GET_INFO: "/user",
    SIGNUP_COMPLETE: "/user/complete-signUp",
    UPDATE_PROFILE: "/user/update",
  },
  SERVICE: {
    GET_ALL: "/service",
    GET_ONE_BASE: "/service/",
  },
  ADMIN: {
    VPS: {
      CREATE: "/admin/service",
      GET_ALL: "/admin/service",
      GET_ONE_BASE: "/admin/service/",
      EDIT_BASE: "/admin/service/",
      DELETE_BASE: "/admin/service/",
    },
  },
};
