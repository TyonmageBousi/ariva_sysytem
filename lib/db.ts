
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { categories, colorCategories, cartItems, temporaryOrders, temporaryOrderItems, orders, orderItems, products } from "./schema"
import { eq, and, SQL } from 'drizzle-orm';
import { ProductPurchaseValues } from '@/app/schemas/productPurchase'
import { auth } from "@/auth";
import { cookies } from 'next/headers';
import { AuthError } from '@/lib/errors'
import { createClient } from '@supabase/supabase-js';
import { AppError } from '@/lib/errors'
import { ProductErrors, StockError } from '@/app/api/user/settlement/route'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

declare global {
  var __pgClient: postgres.Sql | undefined;
}

function createDbClient() {
  if (global.__pgClient) {
    return global.__pgClient;
  }

  if (!process.env.DATABASE_URL_POOLING) {
    throw new Error('DATABASE_URL_POOLING is not defined');
  }

  console.log('🔵 新しいDB接続プールを作成');

  const client = postgres(process.env.DATABASE_URL_POOLING, {
    prepare: false,
    max: 10,
    idle_timeout: 60 * 10,
    connect_timeout: 30,
    max_lifetime: 60 * 60,

    onclose: () => {
      console.log('⚠️ データベース接続が閉じられました');
      global.__pgClient = undefined;
    },

    debug: process.env.NODE_ENV === 'development',
  });

  global.__pgClient = client;
  return client;
}

const pgClient = createDbClient();

export const db = drizzle(pgClient, { schema });


export async function getAllCategories() {
  try {
    return await db.select({ id: categories.id, label: categories.name }).from(categories);
  } catch (error) {
    console.error("getAllCategories failed:", error);
    return []
  }
}

export async function getAllColorCategories() {
  try {
    return await db.select({ id: colorCategories.id, label: colorCategories.name }).from(colorCategories)
  } catch (error) {
    console.error("getAllCategories failed:", error);
    return [];
  }
}

export async function loginJudgment() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new AuthError();
  }
  return session.user;
}

export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();

  let sessionId = cookieStore.get('session_id')?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();  // ← cryptoを追加
    cookieStore.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15
    });
  }

  return sessionId;
}

export async function insertStorage(imageEntries: FormDataEntryValue[]) {
  const imagesFiles = imageEntries.filter(entry => entry instanceof File) as File[];
  const uploadImages = imagesFiles.map(async (image) => {

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10);
    const extension = image.name.split('.').pop() || 'png';
    const sanitizedFileName = `${timestamp}-${randomStr}.${extension}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`images/${sanitizedFileName}`, image);
    if (error) {
      console.error('upload error:', error);
      throw new Error
    }
    return data.path;
  })
  return await Promise.all(uploadImages);
}


export async function deleteStorage(removeFiles: string[]) {
  const { data, error } = await supabase.storage
    .from('images')
    .remove(removeFiles);
  if (error) {
    throw new Error(`画像の削除に失敗しました: ${error.message}`);
  }
}
