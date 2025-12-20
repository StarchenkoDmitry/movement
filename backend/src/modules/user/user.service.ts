import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserId } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    tx?: EntityManager,
  ): Promise<User> {
    const userRepository = tx ? tx.getRepository(User) : this.userRepository;

    const user = userRepository.create(createUserDto);
    return await userRepository.save(user);
  }

  async findOne(id: UserId): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: UserId, updateUserDto: Partial<CreateUserDto>) {
    return await this.userRepository.update(id, updateUserDto);
  }
}
