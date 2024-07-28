import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { MyModuleModule } from './my-module/my-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
      expandVariables: true,
      //cache: true,
    }),
    ConfigModule.forRoot(),
    GptModule,
    MyModuleModule,
  ],
})
export class AppModule {}
