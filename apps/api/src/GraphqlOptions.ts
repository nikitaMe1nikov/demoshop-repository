import { join } from 'path';
import { writeFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compose, omit } from 'ramda';
import { DateTimeResolver } from 'graphql-scalars';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';
import AuthDirective from '@api/modules/directives/auth.directive';
import { TOKEN_NAME_IN_COOKIE, ANONIM_CART_NAME_IN_COOKIE } from '@api/CONSTANTS';
import { Response, Request } from 'express';
import type { OrderData } from '@api/db';

export interface UserJWTData {
  sub: string;
}

export interface AnonimOrderData extends OrderData {}

export interface NestContext {
  req: Request;
  res: Response;
  connection: any;
  payload: any;
}

export interface GQLContext extends NestContext {
  anonimOrder?: AnonimOrderData;
  user?: UserJWTData;
}

const PROJECT_PATH = 'apps/api/src';
const SCHEMA_LIB_PATH = 'libs/gql-schema/src';
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const omitJwtTags = omit(['iat', 'exp']);

@Injectable()
export default class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly jwtService: JwtService) {}

  createGqlOptions(): GqlModuleOptions {
    // merge schemas
    const loadedFiles = loadFilesSync(join(process.cwd(), PROJECT_PATH, './modules/**/*.gql'));
    const typeDefs = mergeTypeDefs(loadedFiles);
    writeFileSync(join(process.cwd(), SCHEMA_LIB_PATH, 'schema.gql'), print(typeDefs));

    return {
      typePaths: [join(process.cwd(), PROJECT_PATH, './modules/**/*.gql')],
      typeDefs: [constraintDirectiveTypeDefs],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), SCHEMA_LIB_PATH, 'index.ts'),
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
      context: async ({ req, res, connection, payload }: GQLContext): Promise<GQLContext> => {
        if (connection) {
          return {
            req,
            res,
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
              anonimOrder: omitJwtTags(this.jwtService.verify(anonimCartCookie)) as AnonimOrderData,
            };
          } catch {
            return { req, res, connection, payload };
          }
        }

        try {
          return {
            req,
            res,
            user: omitJwtTags(
              this.jwtService.verify(req.cookies[TOKEN_NAME_IN_COOKIE])
            ) as UserJWTData,
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
