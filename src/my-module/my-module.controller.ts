import { Controller, Get } from '@nestjs/common';
import { MyModuleService } from './my-module.service';

@Controller('my-module')
export class MyModuleController {
  constructor(private readonly myModuleService: MyModuleService) {}

  @Get()
  getHello(): Promise<any> {
    return this.myModuleService.getDocument();
  }
}
