import { JSDOM } from "jsdom";
import markdownit from "markdown-it";

const template = Bun.file("src/index.html");
const jsdom = new JSDOM(await template.text());
const { window } = jsdom;

const body = Bun.file("README.md");
const md = markdownit();


window.document.body.insertAdjacentHTML('beforeend', md.render(await body.text()));

Bun.write("dist/index.html", jsdom.serialize());
