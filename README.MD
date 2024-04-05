# Setup
* Make sure you have Node installed
* Run `npm install` from root
* Run `npx playwright install --with-deps chromium` from root

# Run tests
1. To execute all the tests, you can simply run `BASE_URL=https://staging.com/ npx playwright test`. It will start all the tests in parallel in headless mode.
2. If you want to run tests in headed mode, you need to add --headed flag, e.g - `npx playwright test --headed`
3. Once tests are passed you can check the generated report via `npx playwright show-report` command