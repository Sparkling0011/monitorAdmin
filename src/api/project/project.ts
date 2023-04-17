import { http } from '@/utils/http/axios';

export function createProject(pname: string) {
  return http.request({
    url: '/project/create',
    method: 'GET',
    params: { pname },
  });
}
