export class CreateUserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  role?: string; 
  isActive?: boolean;
  agenceId: number;
  profilePictureUrl?: string;
}
