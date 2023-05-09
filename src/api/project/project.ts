import { http } from '@/utils/http/axios';

export function createProject(pname: string) {
  return http.request({
    url: '/project/create',
    method: 'GET',
    params: { pname },
  });
}

//获取table
export function getProjectList(params) {
  console.log(params);
  return http.request({
    url: '/project/list',
    method: 'get',
    params,
  });
}

export function deleteProject(pid: string) {
  return http.request({
    url: '/project/delete',
    method: 'delete',
    data: { pid },
  });
}
