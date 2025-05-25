import exp from "constants";

export interface UpdateEmployerRequest {
  companyName: string;
  website: string;
  aboutUs: string;
  address: string;
  phoneNumber: string;
}

export interface EmployerProfile {
  id: string;
  companyName: string;
  website: string;
  profilePictureUrl: string | null;
  aboutUs: string;
  address: string;
  phoneNumber: string;
}
