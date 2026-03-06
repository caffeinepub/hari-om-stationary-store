import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ShopInfo {
    tagline: string;
    name: string;
    whatsapp: string;
    address: string;
    phone: string;
    timings: string;
}
export interface GalleryItem {
    caption: string;
}
export interface ProductCategory {
    name: string;
    exampleItems: Array<string>;
    description: string;
}
export interface Review {
    date: string;
    reviewText: string;
    reviewerName: string;
    rating: number;
}
export interface backendInterface {
    getGalleryItems(): Promise<Array<GalleryItem>>;
    getProductCategories(): Promise<Array<ProductCategory>>;
    getReviews(): Promise<Array<Review>>;
    getShopInfo(): Promise<ShopInfo>;
}
