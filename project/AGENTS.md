# Repository Guidelines

## Project Structure & Module Organization
This repository is a Feishu Block/Gadget app. The app shell lives in `app.js`, `app.json`, and `app.ttss`. The main user flow is in `page/index/`, where the app reads Feishu document Markdown and renders WeChat-ready HTML. Conversion logic is isolated in `converter/markdownToHtml.js`, and reusable visual presets live in `themes/`. Shared helpers belong in `util/`, static assets in `image/`, and endpoint or environment values in `config.js`. The `page/API/` and `page/component/` trees contain platform API and component demo pages organized as feature bundles with `.js`, `.json`, `.ttml`, and `.ttss` files.

## Build, Test, and Development Commands
No `package.json`, `Makefile`, or CLI build scripts are checked in. Develop this project by importing the repository root into the Feishu Block/Gadget developer tools using `project.config.json`.

- Import project root in the IDE: uses `compileType: "block"` and opens `page/index/index`
- Preview in simulator: validate the Feishu document to WeChat HTML flow
- Upload/release from the IDE: use the standard Block publishing flow for `block.json`

Before submitting changes, run a manual smoke test: open the index page, generate formatted output from a document, switch themes if relevant, and verify clipboard copy succeeds.

## Coding Style & Naming Conventions
Follow the existing CommonJS style: `require(...)`, `module.exports`, and `Page({...})`/`App({...})`. Use 2-space indentation in new files unless the surrounding file clearly uses a different style. Keep page bundles aligned by filename, for example `page/index/index.js`, `index.ttml`, `index.ttss`, and `index.json`. Use kebab-case for page directories such as `get-location` and `page-scroll-to`. Keep business logic in `converter/` or `util/` instead of growing page handlers.

## Testing Guidelines
There is no automated test framework in this snapshot. Treat manual verification in the Feishu simulator as required. For converter changes, test headings, emphasis, blockquotes, lists, and paragraph wrapping in the generated HTML. For UI changes, confirm `tt` API calls succeed and failure toasts still surface meaningful errors.

## Commit & Pull Request Guidelines
Git history is not present in this workspace, so no repository-specific commit pattern can be inferred. Use short, imperative commit subjects such as `feat: improve markdown list rendering` or `fix: handle clipboard failure toast`. Pull requests should include a brief summary, affected paths, manual test notes, and screenshots or GIFs for UI-facing changes.
