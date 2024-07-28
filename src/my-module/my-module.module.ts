import { Module } from '@nestjs/common';
import { MyModuleService } from './my-module.service';
import { MyModuleController } from './my-module.controller';

@Module({
  controllers: [MyModuleController],
  providers: [MyModuleService],
})
export class MyModuleModule {}
