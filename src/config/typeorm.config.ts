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

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'db-postgresql-sgp1-32387-do-user-7167088-0.a.db.ondigitalocean.com',
//   port: 25060,
//   username: 'doadmin',
//   password: 'ikl60wdvdpez9xbj',
//   database: 'importleads',
//   entities: [__dirname + 'dist/../**/*.entity.{js,ts}'],
//   ssl: true,
//   synchronize: true,
//   logging: false,
//   namingStrategy: new SnakeNamingStrategy(),
// }