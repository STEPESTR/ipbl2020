import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './Contact/ContactModule';
import { PersonModule } from './Person/PersonModule';
import { HospitalModule } from './Hospital/HospitalModule';
import { AddressModule } from './address/AddressModule';
import { EmployeeModule } from './Employee/EmployeeModule';
import { DatabaseService } from './Database/DatabaseService';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    ContactModule,
    PersonModule,
    HospitalModule,
    AddressModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
