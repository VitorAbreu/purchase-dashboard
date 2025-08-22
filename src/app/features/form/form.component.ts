import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { iTask } from '@shared/interfaces/task.interface';
import { iUser } from '@shared/interfaces/user.interface';
import { usersMock } from '@shared/mocks/users.mock';
import { TaskStore } from '@shared/services/task.store.service';

@Component({
  selector: 'app-form',
  imports: [
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [TaskStore],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  #taskStore = inject(TaskStore);
  users: iUser[] = usersMock.users;
  #activatedRouter = inject(ActivatedRoute);
  #router = inject(Router);
  currentTask: iTask | null = null;
  taskForm!: FormGroup;
  fb = inject(FormBuilder);
  statuses: string[] = ['Backlog', 'In Progress', 'In Review', 'Pending', 'Done'];
  priorities: string[] = ['Low', 'Medium', 'High', 'Critical'];

  ngOnInit(): void {
    console.log(this.#activatedRouter.snapshot.params['id'], 'param');
    const idTask = this.#activatedRouter.snapshot.params['id'];
    if (idTask) {
      this.currentTask = this.#taskStore.getById(idTask);
    }
    this.taskForm = this.fb.group({
      uid: [this.currentTask ? this.currentTask.uid : this.generateUidTask()],
      title: [this.currentTask?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.currentTask?.description || '', [Validators.required, Validators.minLength(10)]],
      status: [this.currentTask?.status || '', Validators.required],
      priority: [this.currentTask?.priority || '', Validators.required],
      dueDate: [this.currentTask?.dueDate || '', Validators.required],
      tags: [this.currentTask?.tags || []],
      createdAt: [this.currentTask ? this.currentTask.createdAt : new Date().toISOString()],
      assignee: [this.currentTask?.assignee || null],
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    console.log('submit');
    const formValue = this.taskForm.value;
    const task: iTask = {
      ...formValue,
      updatedAt: new Date().toISOString(), // always update when saving
    };

    console.log('Task Saved:', task);
    // here you can emit event or call a service to save the task
    if (this.currentTask) {
      this.#taskStore.updateItemValue(task);
    } else {
      this.#taskStore.createNewTask(task);
    }
    this.#router.navigate(['/']);
  }

  getErrorMessage(field: string): string {
    if (this.taskForm.get(field)?.hasError('required')) {
      return `${field} is required`;
    }
    if (this.taskForm.get(field)?.hasError('minlength')) {
      const requiredLength = this.taskForm.get(field)?.errors?.['minlength'].requiredLength;
      return `${field} must be at least ${requiredLength} characters`;
    }
    return '';
  }

  deleteTask(): void {
    if (this.currentTask) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.#taskStore.removeTask(this.currentTask?.uid);
        this.#router.navigate(['/']);
      }
    }
  }

  generateUidTask(): string {
    const storageKey = 'lastIdNumber';
    let lastId = parseInt(localStorage.getItem(storageKey) || '1000', 10);
    lastId++;
    localStorage.setItem(storageKey, lastId.toString());
    return `P-${lastId}`;
  }
}
