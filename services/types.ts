export interface Item {
    _id: string;
    name: string;
    description: string;
    category: string[];
    imageUrl: string[];
    brand: string;
    storeIds: { [key: string]: string };
    lastUpdated: string;
    staticPrice: number;
}
  
export interface CartItem extends Item {
    quantity: number;
}