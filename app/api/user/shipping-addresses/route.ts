import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/lib/schema';
import { AddressValues, AddressSchema } from '@/app/schemas/address'

export async function POST(request: Request) {

    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const db = drizzle(client, { schema });
    const data = await request.json();
    const validateData: AddressValues = AddressSchema.parse(data)


}