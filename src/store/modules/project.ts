import { defineStore } from 'pinia';
import { createProject, getProjectList } from '@/api/project/project';

interface IProjectState {
  pid: string;
  projectList: any[];
}

export const useProjectStore = defineStore({
  id: 'project-id',
  state: (): IProjectState => ({
    pid: '',
    projectList: [],
  }),
  actions: {
    async createProject(pname: string) {
      const { pid } = await createProject(pname);
      this.pid = pid;
    },
    async updateProjectID(id: string) {
      this.pid = id;
    },
    async getProjectList(params) {
      const listRes = await getProjectList(params);
      this.projectList = listRes.list;
      return listRes;
    },
  },
  persist: true,
});
