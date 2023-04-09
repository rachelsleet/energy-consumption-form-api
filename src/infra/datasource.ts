import { DataSource } from 'typeorm'
import { Answer } from '../domain/entities/Answer'
import { Submission } from '../domain/entities/Submission'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'admin',
  database: 'template1',
  entities: [Answer, Submission],
  synchronize: true,
  logging: false,
})
