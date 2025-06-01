import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Records } from './entity/recordings.entity';

@Module({
  providers: [RecordsService],
  imports: [
    TypeOrmModule.forFeature([ Records ])
  ],
  exports: [ RecordsService ]
})
export class RecordsModule {}
