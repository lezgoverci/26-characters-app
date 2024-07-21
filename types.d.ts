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
    treasure_chest_link: string;
    prompt: string;
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
  }