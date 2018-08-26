import dotEnv from 'dotenv';
import pg from 'pg-promise';
import { Pool } from 'pg';

dotEnv.config();

const connectionString = process.env.DB;
const pool = new Pool({ connectionString });
pool.connect();

// DROP TABLE IF EXISTS Users CASCADE;
// DROP TABLE IF EXISTS Questions CASCADE;
// DROP TABLe IF EXISTS Answers CASCADE;

const createTable = () => {
	const query = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(150) NOT NULL,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS Questions(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            userId int REFERENCES users(id),
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS Answers(
            id SERIAL PRIMARY KEY,
            Answer TEXT NOT NULL,
            QuestionId int REFERENCES Questions(id),
            userId int REFERENCES users(id),
            status VARCHAR(50) NOT NULL,
            date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;

	pool.query(query)
		.then(result => pool.end())
		.catch(error => pool.end());
};
createTable();

const pgp = pg();
export const db = pgp(connectionString);
