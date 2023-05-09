import { http } from '@/utils/http/axios';

export function getLoadingData(params) {
  return http.request({
    url: '/perf/loading',
    method: 'GET',
    params,
  });
}
