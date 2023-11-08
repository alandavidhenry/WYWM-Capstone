export interface ProductData {
    products: Product[];
    books: Product[];
}

export interface Product {
    id: string;
    name: string;
    image: string;
    price: number; 
    quantity: number;
}