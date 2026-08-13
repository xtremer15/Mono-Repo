import { test as pagesFixtures } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { LoginPage } from './login.page';
import { HomePage } from './home.page';
import { RegisterPage } from './register.page';
import { CartPage } from './cart.page';
import { AccountPage } from './account.page';
import { SearchPage } from './search.page';
import { ProductPage } from './product.page';
import { ShippingDetailsPage } from './shipping_details.page';
import { OrderPage } from './order.page';
import { BaseService } from '../services/base.service';
import { generateRandomName } from '../utils/Utils';
import { PageFactory } from '../factory/page-factory';

export type AuthOptions = {
    authIsolation: 'test' | 'worker';
};

export type PagesFixtures = AuthOptions & {
    loginPage: LoginPage;
    homePage: HomePage;
    registerPage: RegisterPage;
    cartPage: CartPage;
    accountPage: AccountPage;
    searchPage: SearchPage;
    productPage: ProductPage;
    checkoutPage: ShippingDetailsPage;
    orderPage: OrderPage;
    baseService: BaseService;
};

const pages = pagesFixtures.extend<PagesFixtures>({
    authIsolation: ['test', { option: true }],
    storageState: async ({ browser, baseURL, authIsolation }, use, testInfo) => {
        const authDir = path.resolve('.auth');
        // Configurable isolation: testId - unique user per test, workerIndex - shared user per worker
        // Use randomUUID() so that manual re-runs in Playwright UI mode always get a completely fresh user/cart state
        const fileId = authIsolation === 'worker' 
            ? testInfo.workerIndex 
            : randomUUID();
        const fileName = path.resolve(authDir, `user-${fileId}.json`);

        if (fs.existsSync(fileName)) {
            await use(fileName);
            return;
        }

        if (!fs.existsSync(authDir)) {
            fs.mkdirSync(authDir, { recursive: true });
        }

        // We cannot use the `homePage` fixture here because fixtures depend on `page`,
        // which depends on `context`, which depends on `storageState` (circular dependency).
        // So we must manually create a temporary page to register the user.
        const page = await browser.newPage({ baseURL });
        const homePage = PageFactory.createPage(page, 'home');
        const registerPage = PageFactory.createPage(page, 'register');
        const accountPage = PageFactory.createPage(page, 'account');

        const email = generateRandomName() + "@example.com";
        await page.goto("/");
        await homePage.selectTopMenuItem("My account", "Register");
        await registerPage.assertIsOnRegisterPage();
        await registerPage.fillPersonalDetailsAndSubmit("test", "user", email, "test_password");
        await accountPage.assertAccountCreated();

        await page.context().storageState({ path: fileName });
        await page.close();

        await use(fileName);
    },
    loginPage: ({ page }, use) => use(PageFactory.createPage(page, 'login')),
    homePage: ({ page }, use) => use(PageFactory.createPage(page, 'home')),
    registerPage: ({ page }, use) => use(PageFactory.createPage(page, 'register')),
    cartPage: ({ page }, use) => use(PageFactory.createPage(page, 'cart')),
    accountPage: ({ page }, use) => use(PageFactory.createPage(page, 'account')),
    searchPage: ({ page }, use) => use(PageFactory.createPage(page, 'search')),
    productPage: ({ page }, use) => use(PageFactory.createPage(page, 'product')),
    checkoutPage: ({ page }, use) => use(PageFactory.createPage(page, 'checkout')),
    orderPage: ({ page }, use) => use(PageFactory.createPage(page, 'order')),
    baseService: ({ page }, use) => use(new BaseService(page)),
});

export default pages;

export { expect } from '@playwright/test';
