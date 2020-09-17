import {IsNotEmpty} from 'class-validator';
import {Column, Entity, ObjectIdColumn} from 'typeorm';
import {ObjectID} from 'mongodb';
import {Exclude, Expose} from 'class-transformer';

@Entity()
export class User {

  @ObjectIdColumn()
  @Exclude()
  _id: ObjectID;

  @Expose()
  get id() {
    return this._id.toHexString();
  }

  @Column()
  @IsNotEmpty() // client-side email verification only
  email: string;

  @Column()
  @IsNotEmpty()
  @Exclude({toPlainOnly: true})
  password: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  emailConfirmed: boolean;

  @Column()
  @Exclude()
  emailConfirmationUuid: string;

  @Column()
  @Exclude()
  isActive: boolean;

}
