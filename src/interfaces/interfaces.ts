export interface User {
  id: string;
  role: UserType | null;
  name: string;
  email: string;
  profileImage?: string | null;
  location?: string | null;
  phone?: string | null;
  occupation?: string | null;
  city?: string | null;
  bio?: string | null;
  services?: Service[];
}

export enum UserType {
  CLIENT,
  WORKER,
  ADMIN,
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  hourlyRate: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  userId: string;
  worker: User;
}
