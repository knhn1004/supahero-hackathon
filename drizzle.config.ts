import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'

dotenv.config({
	path: './.env.local',
})



export default defineConfig({
	schema: './app/server/db/schema.ts',
	out: './supabase/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DB_URL!,
	},
});
