import dotEnv from 'dotenv';
import pg from 'pg-promise';
import { Pool } from 'pg';

dotEnv.config();

const connectionString = process.env.DB;

// DROP TABLE IF EXISTS Users CASCADE;
// DROP TABLE IF EXISTS Questions CASCADE;
// DROP TABLE IF EXISTS Answers CASCADE;
const createTable = () => {
    const pool = new Pool({ connectionString });
    pool.connect();
    const query = `    
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(150) NOT NULL,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS questions(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            userid int NOT NULL,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS answers(
            id SERIAL PRIMARY KEY,
            answer TEXT NOT NULL,
            questionid int NOT NULL,
            userid int NOT NULL,
            date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;

	pool.query(query)
		.then(result => pool.end())
		.catch(error => pool.end());
};
createTable();

const pgp = pg();
export const db = pgp(connectionString);
