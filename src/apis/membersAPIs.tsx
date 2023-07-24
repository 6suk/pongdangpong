import { RequestBody } from './apiInterfaces';

/**
 * [members-C] 회원 등록
 * @필수 `body`
 */
export const members_create: RequestBody<Members_request> = {
  method: 'post',
  url: 'members',
  isBody: true,
  body: {
    name: '홍길동',
    birthDate: '2023-07-22',
    phone: 'string',
    sex: 'MALE',
    job: 'string',
    acqusitionFunnel: 'string',
    acquisitionFunnel: 'string',
    toss: [
      {
        id: 0,
        agree: true,
      },
    ],
  },
};

/**
 * [members-C] 회원 등록 - `Request Body`
 */
export interface Members_request {
  name: string;
  /**2023-07-22 형식 */
  birthDate: string;
  phone: string;
  sex: 'MALE' | 'FEMALE';
  job: string;
  acqusitionFunnel: string;
  acquisitionFunnel: string;
  toss: [
    {
      id: number;
      agree: boolean;
    },
  ];
}
