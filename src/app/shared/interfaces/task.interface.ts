import { iUser } from './user.interface';

export interface iTask {
  uid: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  assignee: iUser | null;
}
