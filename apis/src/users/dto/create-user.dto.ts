import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;
  prisma: any;

  async createUser(data: CreateUserDto) {
    console.log('Creating user with data:', data); // 🔍 Debug
    return this.prisma.user.create({ data });
  }

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  agenceId: number;  // ✅ Remplacer string par number
}