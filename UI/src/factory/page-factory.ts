import { Page } from "@playwright/test";
import { PageType, PageMap } from "./factory.types";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { CartPage } from "../pages/cart.page";
import { AccountPage } from "../pages/account.page";
import { SearchPage } from "../pages/search.page";
import { ProductPage } from "../pages/product.page";
import { ShippingDetailsPage } from "../pages/shipping_details.page";
import { OrderPage } from "../pages/order.page";

export class PageFactory {
    static createPage<K extends PageType>(page: Page, type: K): PageMap[K] {
        switch (type) {
            case 'login': return new LoginPage(page) as any;
            case 'home': return new HomePage(page) as any;
            case 'register': return new RegisterPage(page) as any;
            case 'cart': return new CartPage(page) as any;
            case 'account': return new AccountPage(page) as any;
            case 'search': return new SearchPage(page) as any;
            case 'product': return new ProductPage(page) as any;
            case 'checkout': return new ShippingDetailsPage(page) as any;
            case 'order': return new OrderPage(page) as any;
            default:
                throw new Error(`Page type ${type} not found`);
        }
    }
}