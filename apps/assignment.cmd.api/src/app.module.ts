import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentModule } from './assignment/assignment.module';
import { ShiftModule } from './shift/shift.module';

@Module({
  imports: [AssignmentModule, ShiftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
