import { tasksMock } from '@shared/mocks/tasks.mock';
import { iTask } from './../interfaces/task.interface';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  #setListItems = signal<iTask[]>(this.#parseItems());
  getListItems = this.#setListItems.asReadonly();

  #parseItems(): iTask[] {
    let list = localStorage.getItem('pr-items');
    list = list !== 'undefined' && list ? list : JSON.stringify(tasksMock.tasks);
    return JSON.parse(list);
  }

  #updateLocalStorage(): void {
    localStorage.setItem('pr-items', JSON.stringify(this.#setListItems()));
  }

  removeTask(uid: string): void {
    this.#setListItems.update((oldValue: iTask[]) => {
      return oldValue.filter((item) => item.uid !== uid);
    });
    this.#updateLocalStorage();
  }

  createNewTask(task: iTask): void {
    localStorage.setItem('pr-items', JSON.stringify([...this.#setListItems(), task]));
    this.#setListItems.set(this.#parseItems());
  }

  updateItemValue(task: iTask): void {
    this.#setListItems.update((oldValue: iTask[]) => {
      return oldValue.map((item) => (item.uid === task.uid ? task : item));
    });

    this.#updateLocalStorage();
  }

  getById(uid: string): iTask | null {
    return this.getListItems().find((task: iTask) => task.uid === uid) || null;
  }
}
