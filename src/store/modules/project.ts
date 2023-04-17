import { defineStore } from 'pinia';
import { createProject } from '@/api/project/project';

interface IProjectState {
  pid: string;
}

export const useProjectStore = defineStore({
  id: 'project-id',
  state: (): IProjectState => ({
    pid: '',
  }),
  actions: {
    async createProject(pname: string) {
      const { pid } = await createProject(pname);
      this.pid = pid;
    },
    async updateProjectID(id: string) {
      this.pid = id;
    },
  },
  persist: true,
});
