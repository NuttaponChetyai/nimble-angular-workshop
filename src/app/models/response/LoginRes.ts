import { BaseRes } from './BaseRes';
export interface LoginRes extends BaseRes {
  data: Login
}

interface Login {
  accountId: string;
  fullName: string;
  accessToken: string;
  expiredDate: string;
}
