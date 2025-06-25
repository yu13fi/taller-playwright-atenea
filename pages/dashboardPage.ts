import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.dashboardTitle = page.getByTestId('titulo-dashboard')
    }

    async visitarPaginaLogin() {
        await this.page.goto('https://atena-redux.ngrok.app/dashboard');
        await this.page.waitForLoadState('networkidle');
    }


}