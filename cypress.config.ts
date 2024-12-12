import { defineConfig } from "cypress";
import { plugins } from "cypress-social-logins";

const googleSocialLogin = plugins.GoogleSocialLogin;

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // Add custom browser launch options
            on("before:browser:launch", (browser, launchOptions) => {
                if (browser.family === "chromium" && browser.name === "chrome") {
                    const userProfile = "/path/to/your/user/profile"; // Replace with the actual path
                    launchOptions.args.push(`--user-data-dir=${userProfile}`);
                }
                return launchOptions;
            });
            // implement node event listeners here
            on("task", {
                GoogleSocialLogin: googleSocialLogin, // listens for GoogleSocialLogin task in tests
            });
        },
        baseUrl: "http://localhost:3001",
        chromeWebSecurity: false, // allow cypress to access cross-domain URLS such as NextAuth.js login provider pages

        // experimentalStudio: true,
        // experimentalSessionAndOrigin: true,
    },
});
