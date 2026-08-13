import { expect, Locator, Page } from "@playwright/test";
import { ShippingAddress } from "../interfaces/shipping_address.interface";
import { BasePage } from "../utils/BasePage";

export class ShippingDetailsPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }




  // Payment / Billing Address
  private readonly paymentAddress = this.page.locator("#payment-address");
  private readonly newAddressRadio = this.paymentAddress.locator("#input-payment-address-new");
  private readonly companyInput = this.paymentAddress.locator("#input-payment-company");
  private readonly billingFirstNameInput = this.paymentAddress.locator("#input-payment-firstname");
  private readonly billingLastNameInput = this.paymentAddress.locator("#input-payment-lastname");
  private readonly address1Input = this.paymentAddress.locator("#input-payment-address-1");
  private readonly address2Input = this.paymentAddress.locator("#input-payment-address-2");
  private readonly cityInput = this.paymentAddress.locator("#input-payment-city");
  private readonly postCodeInput = this.paymentAddress.locator("#input-payment-postcode");
  private readonly countryDropdown = this.paymentAddress.locator("#input-payment-country");
  private readonly regionDropdown = this.paymentAddress.locator("#input-payment-zone");
  private readonly shippingAddressSameCheckbox = this.paymentAddress.locator("#input-shipping-address-same");

  // Shipping Address
  private readonly shippingForm = this.page.locator("#shipping-address");
  private readonly shippingFirstNameInput = this.shippingForm.locator("#input-shipping-firstname");
  private readonly shippingLastNameInput = this.shippingForm.locator("#input-shipping-lastname");
  private readonly shippingAddressInput = this.shippingForm.locator("#input-shipping-address-1");
  private readonly shippingCityInput = this.shippingForm.locator("#input-shipping-city");
  private readonly shippingPostCodeInput = this.shippingForm.locator("#input-shipping-postcode");
  private readonly shippingCountryDropdown = this.shippingForm.locator("#input-shipping-country");
  private readonly shippingRegionDropdown = this.shippingForm.locator("#input-shipping-zone");
  private readonly newShippingAddressRadio = this.page.locator("#input-shipping-address-new");


  // Shipping / Payment Method
  private readonly paymentMethod = this.page.locator("#payment-method");
  private readonly shippingMethod = this.page.locator("#shipping-method");


  // Order & Accordion
  private readonly orderComment = this.page.locator("#input-comment");
  private readonly continueButton = this.page.locator("#button-save");
  private readonly confirmOrderButton = this.page.getByRole("button", { name: "Confirm Order" });
  private readonly accordion = this.page.locator("#accordion");
  private readonly couponSection = this.accordion.locator("#collapse-coupon");
  private readonly voucherSection = this.accordion.locator("#collapse-voucher");
  private readonly couponInput = this.couponSection.locator("#input-coupon");
  private readonly applyCouponButton = this.couponSection.locator("#button-coupon");
  private readonly voucherInput = this.voucherSection.locator("#input-voucher");
  private readonly applyVoucherButton = this.voucherSection.locator("#button-voucher");


  // Checkout Cart
  private readonly checkoutCart = this.page.locator("#checkout-cart");
  private readonly cartItems = this.checkoutCart.locator("tbody tr");
  private readonly checkoutTotal = this.page.locator("#checkout-total");
  private readonly warningAlert = this.page.locator(
    ".alert.alert-warning"
  );
  private readonly termsAndConditionsCheckbox2 = this.page.getByLabel(
    "I have read and agree to the Terms & Conditions"
  );



  async checkTermsAndConditions(): Promise<void> {
    await this.termsAndConditionsCheckbox2.first().check({ force: true });
  }
  // Payment / Billing Address (Methods)
  async fillCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }
  async fillAddress1(address: string): Promise<void> {
    await this.address1Input.fill(address);
  }
  async fillAddress2(address: string): Promise<void> {
    await this.address2Input.fill(address);
  }
  async fillCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
  }
  async fillPostCode(postCode: string): Promise<void> {
    await this.postCodeInput.fill(postCode);
  }
  async selectCountry(country: string): Promise<void> {
    await this.countryDropdown.selectOption({ label: country });
  }
  async selectRegion(region: string): Promise<void> {
    await this.regionDropdown.selectOption({ label: region });
  }
  async setShippingAddressSameAsBilling(same: boolean): Promise<void> {
    await this.shippingAddressSameCheckbox.waitFor({ state: "attached" });
    const isChecked = await this.shippingAddressSameCheckbox.isChecked();
    if (same !== isChecked) {
      await this.page.locator('label[for="input-shipping-address-same"]').click();
    }
  }

  async waitForShippingAddress(): Promise<void> {
    await this.shippingForm.waitFor({ state: "visible" });
  }
  async fillBillingAddress(address: ShippingAddress): Promise<void> {
    await this.paymentAddress.waitFor({ state: "visible" });

    // Check if the "new address" radio is visible and click it to reveal the form
    if (await this.newAddressRadio.isVisible()) {
      await this.newAddressRadio.check({ force: true });
    }

    await this.billingFirstNameInput.fill(address.firstName);
    await this.billingLastNameInput.fill(address.lastName);
    await this.fillAddress1(address.address);
    await this.fillCity(address.city);
    await this.fillPostCode(address.postCode);
    await this.selectCountry(address.country);
    await this.selectRegion(address.region);
  }


  async fillShippingAddress(address: ShippingAddress): Promise<void> {
    if (await this.newShippingAddressRadio.isVisible()) {
      await this.newShippingAddressRadio.check({ force: true });
    }

    await expect(this.shippingFirstNameInput).toBeVisible();
    await this.shippingFirstNameInput.pressSequentially(address.firstName);
    await this.shippingLastNameInput.fill(address.lastName);
    await this.shippingAddressInput.fill(address.address);
    await this.shippingCityInput.fill(address.city);
    await this.shippingPostCodeInput.fill(address.postCode);
    await this.shippingCountryDropdown.selectOption({ label: address.country });
    await this.shippingRegionDropdown.selectOption({ label: address.region });
  }

  async selectMethod(type: "shipping" | "payment", method: string): Promise<void> {
    const container = type === "shipping" ? this.shippingMethod : this.paymentMethod;
    await container.getByRole("radio", { name: method, exact: false }).check();
  }


  // Order (Methods)
  async addOrderComment(comment: string): Promise<void> {
    await this.orderComment.fill(comment);
  }
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
  }


  // Cart (Methods)
  private getCartItem(productName: string) {
    return this.cartItems.filter({
      has: this.page.getByRole("link", { name: productName, exact: true }),
    });
  }
  private getQuantityInput(productName: string) {
    return this.getCartItem(productName).locator('input[id^="quantity_"]');
  }
  private getUpdateButton(productName: string) {
    return this.getCartItem(productName).getByTitle("Update");
  }
  private getRemoveButton(productName: string) {
    return this.getCartItem(productName).getByTitle("Remove");
  }
  private getUnitPriceLocator(productName: string) {
    return this.getCartItem(productName).locator("td").nth(3);
  }
  private getTotalPriceLocator(productName: string) {
    return this.getCartItem(productName).locator("td").nth(4);
  }

  async getQuantity(productName: string): Promise<string> {
    return await this.getQuantityInput(productName).inputValue();
  }
  async setQuantity(productName: string, quantity: string): Promise<void> {
    await this.getQuantityInput(productName).fill(quantity);
  }
  async updateQuantity(productName: string): Promise<void> {
    await this.getUpdateButton(productName).click();
  }
  async removeProduct(productName: string): Promise<void> {
    await this.getRemoveButton(productName).click();
  }
  async getUnitPrice(productName: string): Promise<string> {
    return await this.getUnitPriceLocator(productName).innerText();
  }
  async getTotalPrice(productName: string): Promise<string> {
    return await this.getTotalPriceLocator(productName).innerText();
  }


  // Checkout Totals (Methods)
  private getCheckoutTotalRow(label: string): Locator {
    return this.checkoutTotal.locator("tr").filter({ hasText: label });
  }
  async getCheckoutTotal(label: string): Promise<string> {
    const td = this.getCheckoutTotalRow(label).locator("td").last();
    await expect(td).toBeVisible()
    return await td.innerText();
  }


  // Coupon / Gift Certificate (Methods)
  async applyCoupon(coupon: string): Promise<void> {
    await this.couponInput.fill(coupon);
    await this.applyCouponButton.click();
  }
  async applyGiftCertificate(code: string): Promise<void> {
    await this.voucherInput.fill(code);
    await this.applyVoucherButton.click();
  }

  private getWarningMessage(type: "terms" | "privacy"): string {
    switch (type) {
      case "terms":
        return "Warning: You must agree to the Terms & Conditions!";

      case "privacy":
        return "Warning: You must agree to the Privacy Policy!";
    }
  }

  async waitForCheckoutTotal(): Promise<void> {
    await expect(this.checkoutTotal).toBeVisible();
  }

  async assertWarning(
    type: "terms" | "privacy"
  ): Promise<void> {
    await expect.soft(this.warningAlert).toContainText(
      this.getWarningMessage(type)
    );
  }
}