import dotEnv from 'dotenv';

dotEnv.config();
const pgp = require('pg-promise')();
export const db = pgp(process.env.DB);