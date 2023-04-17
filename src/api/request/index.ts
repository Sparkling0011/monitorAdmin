import { http } from '@/utils/http/axios';

export function getRequestErrorList(params) {
  return http.request({
    url: '/request/list',
    method: 'GET',
    params,
  });
}
