import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
/**
 * Get current user decorator
 */
export const GetCurrentUser = createParamDecorator(
  (data, ctx: GqlExecutionContext) => {
    const { req } = ctx.getArgByIndex(2);
    return req.user;
  },
);
