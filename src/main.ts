export {};

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <h1>Hello World</h1>
    <p>I'm hosted with GitHub Pages.</p>
  `;
}
