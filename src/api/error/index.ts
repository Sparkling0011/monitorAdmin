import { http } from '@/utils/http/axios';

export function getErrorDistribution(params) {
  return http.request({
    url: '/error/distribution/summary',
    method: 'GET',
    params,
  });
}
