export type TemOrdersData = {
    temporaryOrderItems: {
        imageFilePath: string;
        price: number;
        productId: number;
        productName: string;
        quantity: number;
    }[];
    postalCode: string;
    prefecture: string;
    city: string;
    address1: string;
    address2: string | null;
    totalPrice: number;
    phoneNum: number;
}