import {Column, Entity, ObjectID, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

}
