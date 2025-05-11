import { Gender } from 'src/common/enums/gender.enum';
import { Track } from 'src/common/enums/track.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../users/user.entity';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  fullname: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  image: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  track: Track[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  gender: Gender;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 15,
  })
  dob: string;

  @UpdateDateColumn()
  updatedAt: Date;

  //Estalishing a Bi-relationship with the user taable
  @OneToOne(() => Users, (user) => user.profile)
  user: Users;
}

