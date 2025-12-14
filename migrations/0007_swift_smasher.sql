	CREATE TABLE "temporary_order_items" (
		"id" serial PRIMARY KEY NOT NULL,
		"order_id" integer NOT NULL,
		"product_id" integer NOT NULL,
		"quantity" integer NOT NULL,
		"productName" text NOT NULL,
		"price" integer NOT NULL,
		"created_at" timestamp with time zone DEFAULT now() NOT NULL,
		"updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	--> statement-breakpoint
	CREATE TABLE "temporary_orders" (
		"id" serial PRIMARY KEY NOT NULL,
		"user_id" integer NOT NULL,
		"total_price" integer NOT NULL,
		"status" text DEFAULT 'pending' NOT NULL,
		"postalCode" text DEFAULT '' NOT NULL,
		"prefecture" text DEFAULT '' NOT NULL,
		"city" text DEFAULT '' NOT NULL,
		"address1" text DEFAULT '' NOT NULL,
		"address2" text,
		"created_at" timestamp with time zone DEFAULT now() NOT NULL,
		"updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
