import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compose, omit } from 'ramda';
import { DateTimeResolver } from 'graphql-scalars';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import AuthDirective from 'modules/directives/auth.directive';
import { TOKEN_NAME_IN_COOKIE, ANONIM_CART_NAME_IN_COOKIE } from 'CONSTANTS';

const PROJECT_PATH = 'apps/api/src';
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const omitJwtTags = omit(['iat', 'exp']);

@Injectable()
export default class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly jwtService: JwtService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: [join(process.cwd(), PROJECT_PATH, './modules/**/*.gql')],
      typeDefs: [constraintDirectiveTypeDefs],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), PROJECT_PATH, './modules/gql.schema.ts'),
        outputAs: 'class',
        emitTypenameField: true,
      },
      transformSchema: compose(constraintDirective()),
      schemaDirectives: {
        auth: AuthDirective,
      },
      resolvers: {
        DateTime: DateTimeResolver,
      },
      context: async ({ req, res, connection, payload }) => {
        if (connection) {
          return {
            connection,
            payload,
          };
        }

        // emulate real word delay
        await delay(400);

        const anonimCartCookie = req.cookies[ANONIM_CART_NAME_IN_COOKIE];

        if (anonimCartCookie) {
          try {
            return {
              req,
              res,
              connection,
              payload,
              anonimOrder: omitJwtTags(this.jwtService.verify(anonimCartCookie)),
            };
          } catch {
            return { req, res, connection, payload };
          }
        }

        try {
          return {
            req,
            res,
            user: omitJwtTags(this.jwtService.verify(req.cookies[TOKEN_NAME_IN_COOKIE])),
            connection,
            payload,
          };
        } catch {
          return { req, res, connection, payload };
        }
      },
    };
  }
}
