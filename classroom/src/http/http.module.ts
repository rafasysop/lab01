import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { CoursesService } from 'src/services/courses.services';
import { StudentsService } from 'src/services/students.service';
import { EnrollmentsService } from 'src/services/enrollments.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [
    StudentsResolver,
    CoursesResolver,
    EnrollmentsResolver,
    CoursesService,
    StudentsService,
    EnrollmentsService,
  ],
})
export class HttpModule {}
