import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InspectionRuntimeRepository } from './inspection-runtime.repository';
import { InspectionRuntimeController } from './inspection-runtime.controller';
import { InspectionRuntimeService } from './inspection-runtime.service';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionRuntimeRepository])],
  controllers: [InspectionRuntimeController],
  providers: [InspectionRuntimeService]
})
export class InspectionRuntimeModule { }
