import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { GetUserDto } from 'src/users/dto/get-user.inputs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<GetUserDto | undefined> {
      let _user: GetUserDto = undefined
    const user = await this.usersService.findOne(username);
    const res = await bcrypt.compare(pass, user.password)
    if(res){
      const {password, ...result} = user
      _user = result
    }
    return _user
  }

  async login(user : User){
    const payload = {username: user.userName, sub: user.email}
    return {
         access_token: this.jwtService.sign(payload)
    }
  }
  
}