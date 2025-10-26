export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'student';
  average_rating: number;
  created_at: string;
}

export type Service = {
  id: string;
  user_id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  price?: string;
  created_at?: string;
  average_rating?: number;
  availability?: string;
  profiles?: {
    full_name: string;
  };
};

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  user_id: string;
  user: User;
  created_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: 'internship' | 'volunteering' | 'job' | 'call';
  deadline: string;
  requirements: string;
  contact_info: string;
  user_id: string;
  user: User;
  created_at: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  service_id: string;
  reviewer_id: string;
  reviewer: User;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  user_id: string;
  user: User;
  created_at: string;
}