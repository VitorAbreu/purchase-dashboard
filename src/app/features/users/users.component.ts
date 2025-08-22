import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { usersMock } from '@shared/mocks/users.mock';

@Component({
  selector: 'app-users',
  imports: [MatButtonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users = usersMock.users;
}
