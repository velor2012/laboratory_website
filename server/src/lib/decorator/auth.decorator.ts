import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { Roles } from './role.decorator';
import { RolesGuard } from '../guard/roles.guard';

export default function Auth(summary: string,roles?:string[],authMethod?:string) {
    return applyDecorators(
        ApiOperation({ summary: summary }),
        //不需要授权的话就什么都不做
        roles == null || roles == undefined ?  () => { }:Roles(...roles),
        authMethod == null || authMethod == undefined ? () => { }:UseGuards(AuthGuard(authMethod),RolesGuard),
        authMethod == null || authMethod == undefined  ?  () => { }:ApiBearerAuth() ,
    );
}