import { iUser } from '../interfaces/user.interface';

export const usersMock: { users: iUser[] } = {
  users: [
    {
      id: 'U-100',
      name: 'Ariel Rubin',
      avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
      email: 'ariel.rubin@example.com',
    },
    {
      id: 'U-101',
      name: 'Kim Lee',
      avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
      email: 'kim.lee@example.com',
    },
    {
      id: 'U-102',
      name: 'Carlos Martinez',
      avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      email: 'carlos.martinez@example.com',
    },
    {
      id: 'U-103',
      name: 'Sofia Petrova',
      avatarUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
      email: 'sofia.petrova@example.com',
    },
    {
      id: 'U-104',
      name: 'Maya Singh',
      avatarUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
      email: 'maya.singh@example.com',
    },
    {
      id: 'U-105',
      name: 'Deactivated User',
      avatarUrl: 'https://randomuser.me/api/portraits/lego/6.jpg',
      email: 'deactivated@example.com',
      active: false,
    },
  ],
};
