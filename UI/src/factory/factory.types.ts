import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { CartPage } from "../pages/cart.page";
import { AccountPage } from "../pages/account.page";
import { SearchPage } from "../pages/search.page";
import { ProductPage } from "../pages/product.page";
import { ShippingDetailsPage } from "../pages/shipping_details.page";
import { OrderPage } from "../pages/order.page";

export interface PageMap {
    'login': LoginPage;
    'home': HomePage;
    'register': RegisterPage;
    'cart': CartPage;
    'account': AccountPage;
    'search': SearchPage;
    'product': ProductPage;
    'checkout': ShippingDetailsPage;
    'order': OrderPage;
}

export type PageType = keyof PageMap;
export type PageInstanceType = PageMap[PageType];