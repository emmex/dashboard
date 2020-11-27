import {SetMetadata} from '@nestjs/common';
import {UserRole} from '../../user/entity/user-role.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
