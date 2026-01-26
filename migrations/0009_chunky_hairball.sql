ALTER TABLE "order_items" ADD COLUMN "product_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "postalCode" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "prefecture" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "city" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address1" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address2" text;--> statement-breakpoint
ALTER TABLE "temporary_order_items" ADD COLUMN "product_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "productName";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "temporary_order_items" DROP COLUMN "productName";