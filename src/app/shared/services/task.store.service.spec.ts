import { TestBed } from '@angular/core/testing';
import { TaskStore } from './task.store.service';
import { iTask } from '../interfaces/task.interface';

const mockTasks: iTask[] = [
  {
    uid: 'T-1001',
    title: 'Task #1: Design login',
    description: 'Lorem ipsum dolor sit amet',
    status: 'In Review',
    priority: 'Critical',
    dueDate: '2025-08-05T22:22:51Z',
    tags: ['Admin', 'UI'],
    createdAt: '2025-06-27T22:22:51Z',
    updatedAt: '2025-07-16T22:22:51Z',
    assignee: {
      id: 'U-102',
      name: 'Carlos Martinez',
      avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      email: 'carlos.martinez@example.com',
    },
  },
  {
    uid: 'T-1002',
    title: 'Task #2: Implement API',
    description: 'Lorem ipsum dolor sit amet',
    status: 'Backlog',
    priority: 'Medium',
    dueDate: '2025-08-16T22:22:51Z',
    tags: ['Admin'],
    createdAt: '2025-07-10T22:22:51Z',
    updatedAt: '2025-07-25T22:22:51Z',
    assignee: {
      id: 'U-100',
      name: 'Ariel Rubin',
      avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
      email: 'ariel.rubin@example.com',
    },
  },
];

describe('TaskStore', () => {
  let service: TaskStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskStore],
    });

    // Reset localStorage before each test
    localStorage.clear();
    localStorage.setItem('pr-items', JSON.stringify(mockTasks));

    service = TestBed.inject(TaskStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tasks from localStorage', () => {
    const tasks = service.getListItems();
    expect(tasks.length).toBe(2);
    expect(tasks[0].uid).toBe('T-1001');
  });

  it('should remove a task by uid', () => {
    service.removeTask('T-1001');
    const tasks = service.getListItems();
    expect(tasks.length).toBe(1);
    expect(tasks.find((t) => t.uid === 'T-1001')).toBeUndefined();
  });

  it('should add a new task', () => {
    const newTask: iTask = {
      uid: 'T-1003',
      title: 'Task #3: Write tests',
      description: 'Add unit tests for TaskStore',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2025-09-01T22:22:51Z',
      tags: ['Testing'],
      createdAt: '2025-08-22T22:22:51Z',
      updatedAt: '2025-08-22T22:22:51Z',
      assignee: {
        id: 'U-200',
        name: 'Jane Doe',
        avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
        email: 'jane.doe@example.com',
      },
    };

    service.createNewTask(newTask);
    const tasks = service.getListItems();

    expect(tasks.length).toBe(3);
    expect(tasks.some((t) => t.uid === 'T-1003')).toBeTrue();
  });

  it('should update an existing task', () => {
    const updatedTask = { ...mockTasks[0], title: 'Updated Task #1' };
    service.updateItemValue(updatedTask);

    const tasks = service.getListItems();
    const task = tasks.find((t) => t.uid === 'T-1001');

    expect(task).toBeTruthy();
    expect(task?.title).toBe('Updated Task #1');
  });

  it('should return a task by uid', () => {
    const task = service.getById('T-1002');
    expect(task).toBeTruthy();
    expect(task?.uid).toBe('T-1002');
  });

  it('should return null if task not found', () => {
    const task = service.getById('T-9999');
    expect(task).toBeNull();
  });
});
