import { forwardRef, Module } from '@nestjs/common';
import { ResoursesService } from './resourses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resources } from './entity/resourses.entity';

@Module({
  providers: [ResoursesService],
  imports: [
    TypeOrmModule.forFeature([Resources]),
    forwardRef(()=> ResoursesModule),
  ],
  exports: [ ResoursesService ]
})
export class ResoursesModule {}
