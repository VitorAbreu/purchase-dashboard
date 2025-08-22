import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TaskStore } from '@shared/services/task.store.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideRouter, RouterModule } from '@angular/router';

// Mock data
const mockTasks = [
  {
    uid: 'T-1001',
    title: 'Task #1: Design login',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Task auto generated for mock data.',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Task auto generated for mock data.',
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

class MockTaskStore {
  getListItems = jasmine.createSpy().and.returnValue(mockTasks);
}

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TasksComponent,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        DatePipe,
        MatPaginatorModule,
        MatSortModule,
        RouterModule,
        MatChipsModule,
      ],
      providers: [{ provide: TaskStore, useClass: MockTaskStore }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;

    component.sort = {} as MatSort;
    component.paginator = {} as MatPaginator;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource with tasks from TaskStore', () => {
    expect(component.dataSource.data[0].title).toBe('Task #1: Design login');
  });

  it('should filter tasks by title', () => {
    component.textSearch = 'Implement';
    component.selected = '';
    component.onSearch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = (component.dataSource as MatTableDataSource<any>).filteredData;
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Task #2: Implement API');
  });

  it('should filter tasks by status', () => {
    component.textSearch = '';
    component.selected = 'Backlog';
    component.onSearch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = (component.dataSource as MatTableDataSource<any>).filteredData;
    expect(filtered.length).toBe(1);
    expect(filtered[0].status).toBe('Backlog');
  });

  it('should filter tasks by both text and status', () => {
    component.textSearch = 'Carlos';
    component.selected = 'In Review';
    component.onSearch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = (component.dataSource as MatTableDataSource<any>).filteredData;
    expect(filtered.length).toBe(1);
    expect(filtered[0].assignee.name).toBe('Carlos Martinez');
  });
});
