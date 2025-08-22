import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { TaskStore } from '@shared/services/task.store.service';

@Component({
  selector: 'app-tasks',
  imports: [
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
  providers: [TaskStore],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements AfterViewInit {
  #taskStore = inject(TaskStore);
  dataSource = new MatTableDataSource(this.#taskStore.getListItems());
  displayedColumns: string[] = ['uid', 'title', 'assignee.name', 'status', 'priority', 'createdAt', 'action'];
  selected: 'In Review' | 'Backlog' | 'Pending' | 'Done' | 'In Progress' | '' = '';
  textSearch: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data, filter): boolean => {
      const filteredObj: { text: string; status: string } = JSON.parse(filter);
      const matchesText =
        data.title.toLowerCase().includes(filteredObj.text) ||
        !!data.assignee?.name.toLowerCase().includes(filteredObj.text);

      return matchesText && data.status.toLowerCase().includes(filteredObj.status);
    };
  }

  onSearch(): void {
    this.dataSource.filter = JSON.stringify({
      text: this.textSearch.trim().toLowerCase(),
      status: this.selected.trim().toLowerCase(),
    });
  }
}
