import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.input';
import { GetUserDto } from './dto/get-user.inputs';
import { User } from './entities/user.entity';



@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>
  ){}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({where: {userName: username}})
  }

  async findAll(): Promise<GetUserDto[] | undefined>{
      return (await this.usersRepository.find()).map(user =>{ const {password, ...result} = user; return result})
  }

  async create(CreateUserDto: CreateUserDto): Promise<User | undefined> {
      const user: User = this.usersRepository.create(CreateUserDto)
      this.usersRepository.save(user)
      return user
  }
}