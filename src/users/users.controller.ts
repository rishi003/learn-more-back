import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.input';
import { GetUserDto } from './dto/get-user.inputs';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<GetUserDto[]>{
        return this.usersService.findAll()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto)
    }
}
