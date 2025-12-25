type ProductDB = InferSelectModel<typeof products>;

type ProductSelected = Pick<
    ProductDB,
    "id" |
    "skuCode" |
    "name" |
    "price" |
    "discountPrice" |
    "status" |
    "stock" |
    "updatedAt"
>

export type ProductFormatted = ProductSelected & {
    productCategories: string[];
    productColors: string[];
};