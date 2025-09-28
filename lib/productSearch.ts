import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { categories } from "./schema"
import { colorCategories } from "./schema"
import { products } from "./schema"



const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client, { schema });


export async function getSearchProduct() {



}