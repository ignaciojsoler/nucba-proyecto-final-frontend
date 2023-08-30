export interface User {
  id: string;
  role: string | null;
  name: string;
  email: string;
  profileImage?: string;
  location?: string;
  phone?: string;
  occupation?: string;
  city?: string;
  bio?: string;
  services?: Service[];
  createdAt?: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  hourlyRate: number | string;
  userId: string;
  worker: User;
}

export interface FavoriteService {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  serviceId: string;
  user: User;
  service: Service;
}
