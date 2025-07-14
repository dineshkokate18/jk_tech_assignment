import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async updateRole(id: number, role: string) {
    const user = await this.userRepo.findOneBy({ id });
    console.log("user",user)
    if (user) {
      user.role = role as any;
      return this.userRepo.save(user);
    }
    return null;
  }
}
