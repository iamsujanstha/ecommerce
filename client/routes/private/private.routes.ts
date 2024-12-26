import { adminRoute } from '@/routes/private/admin/admin.routes'
import { userRoute } from '@/routes/private/user/user.routes'


export const privateRoutePath = {
  base: '/',
  login: '/auth/login',
  register: '/auth/register',
  forgetPassword: '/auth/forget-password',
  resetPassword: '/auth/reset-password',
  adminRoute,
  userRoute
} as const;
