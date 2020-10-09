
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserRole {
    ANONIM = "ANONIM",
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum OrderStatus {
    CREATED = "CREATED",
    FILLED = "FILLED",
    COMPLATED = "COMPLATED"
}

export enum ProductsSort {
    PriceASC = "PriceASC",
    PriceDSC = "PriceDSC"
}

export class UserSignupInput {
    email: email_String_NotNull_format_email;
    password: password_String_NotNull_minLength_8;
    name: name_String_NotNull_minLength_4_maxLength_40;
    surname?: surname_String_minLength_0_maxLength_40;
}

export class UserLoginInput {
    email: email_String_NotNull_format_email;
    password: password_String_NotNull_minLength_8;
}

export class UserInfoInput {
    email: email_String_NotNull_format_email;
    name: name_String_NotNull_minLength_4_maxLength_40;
    surname?: surname_String_minLength_0_maxLength_40;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id?: string): Category | Promise<Category>;

    abstract banners(): Banner[] | Promise<Banner[]>;

    abstract cart(): Order | Promise<Order>;

    abstract orders(): Order[] | Promise<Order[]>;

    abstract products(categoryID: string, sort?: ProductsSort, first?: number, after?: number): Products | Promise<Products>;

    abstract product(id?: string): Product | Promise<Product>;

    abstract me(): User | Promise<User>;
}

export class Category {
    __typename?: 'Category';
    id: string;
    name: string;
    products: Product[];
}

export class Banner {
    __typename?: 'Banner';
    id: string;
    name: string;
    description: string;
    images: Image;
}

export class Image {
    __typename?: 'Image';
    small: string;
    medium: string;
    big: string;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract addToCart(productID: string): Order | Promise<Order>;

    abstract removeFromCart(productID: string): Order | Promise<Order>;

    abstract deleteFromCart(productID: string): Order | Promise<Order>;

    abstract fillCart(): Order | Promise<Order>;

    abstract addFavorite(id?: string): Product | Promise<Product>;

    abstract removeFavorite(id?: string): Product | Promise<Product>;

    abstract signup(userSignupInput: UserSignupInput): User | Promise<User>;

    abstract login(userLoginInput: UserLoginInput): User | Promise<User>;

    abstract logout(): boolean | Promise<boolean>;

    abstract saveProfile(userInfoInput?: UserInfoInput): User | Promise<User>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract cartChanged(userID: string): CartChangedEvent | Promise<CartChangedEvent>;
}

export class CartChangedEvent {
    __typename?: 'CartChangedEvent';
    order: Order;
    date: DateTime;
}

export class Product {
    __typename?: 'Product';
    amount?: number;
    id: string;
    name: string;
    price: number;
    category: Category;
    favorite: boolean;
    description: string;
}

export class Order {
    __typename?: 'Order';
    id: string;
    status: OrderStatus;
    total: number;
    price: number;
    discount: number;
    products: Product[];
}

export class Products {
    __typename?: 'Products';
    nodes: Product[];
    total: number;
    endCursor: number;
    hasNextPage: boolean;
    currentSort: ProductsSort;
}

export class User {
    __typename?: 'User';
    id: string;
    email: string;
    name: string;
    surname: string;
    roles: UserRole[];
    favorites?: Product[];
    activeOrders: Order[];
}

export type DateTime = any;
export type email_String_NotNull_format_email = any;
export type password_String_NotNull_minLength_8 = any;
export type name_String_NotNull_minLength_4_maxLength_40 = any;
export type surname_String_minLength_0_maxLength_40 = any;
