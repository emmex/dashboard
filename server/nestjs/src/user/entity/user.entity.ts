import {IsEmail, IsNotEmpty} from 'class-validator';
import {Column, Entity, ObjectID, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty() // client-side email verification only
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  emailConfirmed: boolean;

}
