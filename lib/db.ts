
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { categories, colorCategories, cartItems } from "./schema"
import { eq } from 'drizzle-orm';


const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client, { schema });

export async function getAllCategories() {
  return await db.select({ id: categories.id, label: categories.name }).from(categories);
}

export async function getAllColorCategories() {
  return await db.select({ id: colorCategories.id, label: colorCategories.name }).from(colorCategories)
}


export async function getAllUserCart(userId: number) {
  return await db.select({
    id: cartItems.id,
    productId: cartItems.productId,
    productName: cartItems.productName,
    price: cartItems.price,
    quantity: cartItems.quantity,
  }).from(cartItems)
    .where(eq(cartItems.userId, userId));


}
