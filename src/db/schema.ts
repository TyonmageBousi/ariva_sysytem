import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";


export const products = pgTable("products", {
  id: serial("id").primaryKey(),    // 自動で増えるID
  name: text("name").notNull(),     // 商品名（文字列）
  price: integer("price").notNull() // 値段（数字）
});
