import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports:[forwardRef(()=> AuthModule),ConfigModule.forRoot(),TypeOrmModule.forFeature([User])]
})
export class UsersModule {}
