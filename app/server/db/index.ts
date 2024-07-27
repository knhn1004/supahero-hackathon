'use server';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres('postgres://username:password@host:port/database', {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});
export const db = drizzle(client);
