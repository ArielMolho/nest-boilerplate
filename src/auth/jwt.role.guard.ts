import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PayloadType } from './types/payload.type';
import { Roles } from 'src/roles/types/roles';

@Injectable()
export class JwtRoleGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest<TUser = PayloadType>(err: any, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user?.role === Roles.ADMIN || user?.role === Roles.SUPERVISOR) {
      return user;
    }
    throw err || new UnauthorizedException();
  }
}
