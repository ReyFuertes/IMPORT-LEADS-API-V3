import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'p@55w0rd',
  database: 'importleads',
  entities: [__dirname + 'dist/../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
}

