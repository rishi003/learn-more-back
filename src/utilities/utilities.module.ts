import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [],
  exports: [],
  imports: [HttpModule, ConfigModule.forRoot()],
})
export class UtilitiesModule {}
