ALTER TABLE "order_items" ADD COLUMN "productName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "prefecture" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address1" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address2" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "address";