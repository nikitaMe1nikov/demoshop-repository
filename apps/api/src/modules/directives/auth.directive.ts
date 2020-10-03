import { UnauthorizedException } from '@nestjs/common';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { User } from 'modules/gql.schema';

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    const { role } = this.args;

    field.resolve = async function (root, args, context, info) {
      if ((context?.user as User)?.roles.includes(role)) {
        return await resolve.call(this, root, args, context, info);
      }

      throw new UnauthorizedException('You are not authorized for this resourse, sorry)');
    };
  }
}
