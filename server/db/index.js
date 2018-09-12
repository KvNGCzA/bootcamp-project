import dotEnv from 'dotenv';
import pg from 'pg-promise';
import { Pool } from 'pg';

dotEnv.config();

const connectionString = process.env.DB || process.env.DATABASE_URL;

// DROP TABLE IF EXISTS Users CASCADE;
// DROP TABLE IF EXISTS Questions CASCADE;
// DROP TABLE IF EXISTS Answers CASCADE;
const createTable = () => {
    const pool = new Pool({ connectionString });
    // pool.connect();
    const query = `    
        DROP TABLE IF EXISTS Users CASCADE;
        DROP TABLE IF EXISTS Questions CASCADE;
        DROP TABLE IF EXISTS Answers CASCADE;
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(150) NOT NULL,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            occupation TEXT,
            answered_count INT NOT NULL DEFAULT 0,
            asked_count INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS questions(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            username VARCHAR(100) NOT NULL,
            userId INT NOT NULL,
            likes INT NOT NULL DEFAULT 0,
            dislikes INT NOT NULL DEFAULT 0,
            answers_count INT NOT NULL DEFAULT 0,
            tags TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS answers(
            id SERIAL PRIMARY KEY,
            answer TEXT NOT NULL,
            questionId INT REFERENCES questions ON DELETE CASCADE,
            username VARCHAR(100) NOT NULL,
            creator_id INT NOT NULL,
            userId INT NOT NULL,
            likes INT NOT NULL DEFAULT 0,
            dislikes INT NOT NULL DEFAULT 0,
            favorite BOOLEAN DEFAULT false,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;

	pool.query(query)
		.then(() => pool.end())
		.catch(() => pool.end());
};
createTable();

const pgp = pg();
export const db = pgp(connectionString);
