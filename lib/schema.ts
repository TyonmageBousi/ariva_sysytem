import { pgTable, text, integer, timestamp, serial, unique, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// カテゴリテーブル
export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// カラーカテゴリテーブル
export const colorCategories = pgTable('color_categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 商品テーブル
export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    skuCode: text('sku_code').unique(),
    name: text('name').notNull(),
    price: integer('price').notNull(),
    discountPrice: integer('discount_price'),
    status: text('status').notNull(),
    stock: integer('stock').notNull(),
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

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    birthday: timestamp('birthday').notNull(),
    phone: text('phone').notNull(),
    postalCode: text('postal_code').notNull(),
    address: text('address').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const cartItems = pgTable('cart_items', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    productId: integer('product_id').notNull(),
    quantity: integer('quantity').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    totalPrice: integer('total_price').notNull(),
    status: text('status').notNull().default('pending'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});


export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id').notNull(),
    productId: integer('product_id').notNull(),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

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
    productImages: many(productImages),
    orderItems: many(orderItems),
    cartItems: many(cartItems)
}));


export const usersRelations = relations(users, ({ many }) => ({
    orders: many(orders),
    cartItems: many(cartItems)
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

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id]
    }),
    orderItems: many(orderItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    user: one(users, {
        fields: [cartItems.userId],
        references: [users.id]
    }),
    product: one(products, {
        fields: [cartItems.productId],
        references: [products.id]
    })
}));
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id]
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id]
    })
}))