export {};

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <h1>Test Page</h1>
    <p>This is the test sub-page.</p>
    <a href="/">← Back home</a>
  `;
}
