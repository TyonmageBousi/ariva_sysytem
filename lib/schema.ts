import { pgTable, text, integer, timestamp, uuid, serial, unique, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';


// カテゴリテーブル
export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// カラーカテゴリテーブル
export const colorCategories = pgTable('color_categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 商品テーブル
export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    skuCode: text('sku_code').unique(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    price: integer('price').notNull(),
    discountPrice: integer('discount_price'),
    status: integer('status').notNull(),
    saleStartAt: timestamp('sale_start_at', { withTimezone: true }),
    saleEndAt: timestamp('sale_end_at', { withTimezone: true }),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const productImages = pgTable('product_images', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').notNull().references(() => products.id),
    filePath: text('file_path').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})


// 商品とカテゴリの中間テーブル（多対多）
export const productCategories = pgTable('product_categories', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').references(() => products.id).notNull(),
    categoryId: integer('category_id').references(() => categories.id).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const productCategoriesUnique = unique("product_categories_unique").on(
    productCategories.productId,
    productCategories.categoryId
)

// 商品とカラーカテゴリの中間テーブル（多対多）
export const productColors = pgTable('product_colors', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').references(() => products.id).notNull(),
    colorId: integer('color_id').references(() => colorCategories.id).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
export const productColorsUnique = unique("product_colors_unique").on(productColors.productId, productColors.colorId);

// リレーション定義
export const categoriesRelations = relations(categories, ({ many }) => ({
    productCategories: many(productCategories),
}));

export const colorCategoriesRelations = relations(colorCategories, ({ many }) => ({
    productColors: many(productColors),
}));

export const productsRelations = relations(products, ({ many }) => ({
    productCategories: many(productCategories),
    productColors: many(productColors),
    productImages: many(productImages)
}));

export const productCategoriesRelations = relations(productCategories, ({ one }) => ({
    product: one(products, {
        fields: [productCategories.productId],
        references: [products.id],
    }),
    category: one(categories, {
        fields: [productCategories.categoryId],
        references: [categories.id],
    }),
}));

export const productColorsRelations = relations(productColors, ({ one }) => ({
    product: one(products, {
        fields: [productColors.productId],
        references: [products.id],
    }),
    colorCategory: one(colorCategories, {
        fields: [productColors.colorId],
        references: [colorCategories.id],
    }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
    product: one(products, {
        fields: [productImages.productId],
        references: [products.id]
    })
}));



export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    passWord: text('passWord').notNull(),
    birthday: integer('birthday').notNull(),
    phone: integer('phone').notNull(),
    postalCode: text('postalCode').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});