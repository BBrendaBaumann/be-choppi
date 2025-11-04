import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async create(userData: Partial<User>) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }
}
