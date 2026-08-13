import test, { expect } from '../../../src/pages/pages.fixtures';
import { generateRandomName } from '../../../src/utils/Utils';
import { ShippingAddress } from '../../../src/interfaces/shipping_address.interface';

test.describe('Checkout flow by searching the product', () => {

    test('Navigate, search product and navigate to checkout page', async ({ baseService, page, homePage, searchPage, productPage, checkoutPage, orderPage }) => {
        const productName = 'iPhone';

        const billingAddress: ShippingAddress = {
            firstName: "Test",
            lastName: "User",
            address: "123 Main Street",
            city: "London",
            postCode: "EC1A 1BB",
            country: "United Kingdom",
            region: "Lancashire",
        };

        await page.goto("/");

        await homePage.search(productName);
        await searchPage.assertSearchCriteria(productName);

        await searchPage.selectProduct(productName);
        await productPage.assertProductBreadcrumb(productName);

        const productPrice = await productPage.getPrice();
        const productQuantity = await productPage.getQuantity();
        expect(productPrice).toBeTruthy();

        await productPage.addToCart();
        await productPage.assertProductAddedToCart(productName);
        await homePage.assertCartItemCount(productQuantity);
        await homePage.clickToastCheckout();
        await baseService.waitForRouteResponse('route=checkout/checkout/country');

        await checkoutPage.fillBillingAddress(billingAddress);
        await checkoutPage.waitForCheckoutTotal();
        await checkoutPage.checkTermsAndConditions();

        const checkoutSubTotal = await checkoutPage.getCheckoutTotal("Sub-Total");
        const checkoutFLatShippingRate = await checkoutPage.getCheckoutTotal("Flat Shipping Rate");
        const checkoutVat = await checkoutPage.getCheckoutTotal("VAT (20%)");
        const checkoutTotal = await checkoutPage.getCheckoutTotal("Total");

        await checkoutPage.clickContinue();


        const orderConfirmationUnitPrice = await orderPage.getUnitPrice(productName);
        const orderConfirmationSubTotal = await orderPage.getOrderTotal("Sub-Total");
        const orderConfirmationFlatShippingRate = await orderPage.getOrderTotal("Flat Shipping Rate");
        const orderConfirmationVat = await orderPage.getOrderTotal("VAT");
        const orderConfirmationTotal = await orderPage.getOrderTotal("Total");
        const orderConfirmationQuantity = await orderPage.getQuantity(productName)

        expect(productPrice).toBe(orderConfirmationUnitPrice);
        expect(productQuantity).toBe(orderConfirmationQuantity);
        expect(checkoutSubTotal).toBe(orderConfirmationSubTotal);
        expect(checkoutFLatShippingRate).toBe(orderConfirmationFlatShippingRate);
        expect(checkoutVat).toBe(orderConfirmationVat);
        expect(checkoutTotal).toBe(orderConfirmationTotal);

        await orderPage.assertIsOnOrderPage();
        await orderPage.confirmOrder();
        await orderPage.assertOrderPlaced();
    });


    test("Navigate by shop by category, select category and navigate to checkout page", async ({ page, homePage, searchPage, productPage, checkoutPage, orderPage, baseService }) => {
        const productName = "HTC Touch HD";
        const address: ShippingAddress = {
            firstName: "Test",
            lastName: "User",
            address: "123 Main Street",
            city: "London",
            postCode: "EC1A 1BB",
            country: "Tuvalu",
            region: "Funafuti",
        };

        await page.goto("/");


        await homePage.openShopByCategory();
        await homePage.selectShopByCategory("Phone, Tablets & Ipod");


        await searchPage.selectProduct(productName, true);
        await productPage.assertProductBreadcrumb(productName);

        const productPrice = await productPage.getPrice();
        const productQuantity = await productPage.getQuantity();
        expect(productPrice).toBeTruthy();


        await productPage.addToCart();
        await productPage.assertProductAddedToCart(productName);
        await homePage.assertCartItemCount(productQuantity);
        await homePage.clickToastCheckout();
        await baseService.waitForRouteResponse('route=checkout/checkout/country');

        await checkoutPage.fillBillingAddress(address);
        await checkoutPage.setShippingAddressSameAsBilling(false);
        await checkoutPage.fillShippingAddress(address);
        await checkoutPage.waitForCheckoutTotal();
        await checkoutPage.checkTermsAndConditions();

        const checkoutSubTotal = await checkoutPage.getCheckoutTotal("Sub-Total");
        const checkoutFlatShippingRate = await checkoutPage.getCheckoutTotal("Flat Shipping Rate");
        const checkoutTotal = await checkoutPage.getCheckoutTotal("Total");

        await checkoutPage.clickContinue();

        const orderConfirmationUnitPrice = await orderPage.getUnitPrice(productName);
        const orderConfirmationSubTotal = await orderPage.getOrderTotal("Sub-Total");
        const orderConfirmationFlatShippingRate = await orderPage.getOrderTotal("Flat Shipping Rate");
        const orderConfirmationTotal = await orderPage.getOrderTotal("Total");
        const orderConfirmationQuantity = await orderPage.getQuantity(productName);

        expect(productPrice).toBe(orderConfirmationUnitPrice);
        expect(productQuantity).toBe(orderConfirmationQuantity);
        expect(checkoutSubTotal).toBe(orderConfirmationSubTotal);
        expect(checkoutFlatShippingRate).toBe(orderConfirmationFlatShippingRate);
        expect(checkoutTotal).toBe(orderConfirmationTotal);

        await orderPage.assertIsOnOrderPage();
        await orderPage.confirmOrder();
        await orderPage.assertOrderPlaced();
    });
});
