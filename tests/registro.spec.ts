import { test, expect } from '@playwright/test';

test('TC-1 Verificacion de elementos visuales en la pagina registro', async ({ page }) => {
  await page.goto('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
});

test('TC-2 Verificar Boton de registro esta inhabilitado por defecto', async ({ page }) => {
  await page.goto('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-3 Verificar que el botón de registro se habilita al completar los campos obligatorios', async ({ page }) => {
  await page.goto('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/');
  await page.locator('input[name="firstName"]').fill('Yuri')
  await page.locator('input[name="lastName"]').fill('Figueroa');
  await page.locator('input[name="email"]').fill('yuri@email.com');
  await page.locator('input[name="password"]').fill('123456');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a página de inicio de sesión al hacer clic en el botón de registro', async ({ page }) => {
  await page.goto('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/login');;
});

test('TC-5 Verificar Registro exitoso con datos válidos', async ({ page }) => {
  await page.goto('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/');
  await page.locator('input[name="firstName"]').fill('Yuri');
  await page.locator('input[name="lastName"]').fill('Figueroa');
  await page.locator('input[name="email"]').fill('Yurifigueroa'+Date.now().toString()+'@email.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByTestId('boton-registrarse').click();
});


test('TC-6 Verificar que un usuario no pueda registrarse con un correo electrónico ya existente', async ({ page }) => {
 const email = 'juantorres' + Date.now().toString() + '@email.com';
  await page.goto('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/');
  await page.locator('input[name="firstName"]').fill('Yuri');
  await page.locator('input[name="lastName"]').fill('Figueroa');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('123456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await page.goto('https://3168-2803-9800-b887-80f2-4157-b6c1-c250-866d.ngrok-free.app/');
  await page.locator('input[name="firstName"]').fill('yuri');
  await page.locator('input[name="lastName"]').fill('FIGUEROA');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('123456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});



