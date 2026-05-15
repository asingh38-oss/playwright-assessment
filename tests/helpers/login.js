const CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

// handles login so I don't have to repeat this in every test
async function login(page) {
  await page.goto('/');

  await page.getByLabel(/username|email/i).fill(CREDENTIALS.username);
  await page.getByLabel(/password/i).fill(CREDENTIALS.password);
  await page.getByRole('button', { name: /sign in|login|submit/i }).click();

  // wait for either a url change or the sidebar to appear (handles SPA-style login)
  await Promise.race([
    page.waitForURL((url) => !url.pathname.includes('login'), { timeout: 10000 }),
    page.waitForSelector('text=Web Application', { timeout: 10000 }),
  ]);
}

module.exports = { login };
