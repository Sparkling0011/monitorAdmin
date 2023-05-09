import { http } from '@/utils/http/axios';

export function getRuntimeErrorList(params) {
  return http.request({
    url: '/runtime/list',
    method: 'GET',
    params,
  });
}

export function getIntervalCount(params) {
  return http.request({
    url: '/runtime/intervalCount',
    method: 'GET',
    params,
  });
}
