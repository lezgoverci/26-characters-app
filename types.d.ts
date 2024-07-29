export interface Client {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  company_description: string;
  role: string;
  experience: string;
  subscription: string;
  writing_profile: string;
  recruiting_profile: string;
  prompt: string;
  active_monthly_tiles?: string;
};

export interface Template {
  id: number;
  name: string;
  month: string;
  year: string;
  link: string;
  drive_id: string;
  raw_template_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface File {
  id: number;
  client: number;
  template: number;
  link: string;
  status: string;
  filename: string;
  drive_id: string;
  created_at: string;
  updated_at: string;
  generated_treasure_chest?: number;
  type?: string;
}

export interface Account {
  id?: number;
  first_name: string;
  last_name: string;
  profile_photo?: File | null;
}

export interface User {
  id: number;
  email: string;
}

export interface Tile {
  id: number;
  link: string;
  client: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  raw_content: string;
  generated_content: string;
  generated_treasure_chest: number;
  created_at: string;
  updated_generated_content?: string;
}