import { http } from '@/utils/http/axios';

export function getResourceErrorList(params) {
  return http.request({
    url: '/resource/list',
    method: 'GET',
    params,
  });
}

export function getResourceTrend(params) {
  return http.request({
    url: '/resource/trend',
    method: 'GET',
    params,
  });
}
