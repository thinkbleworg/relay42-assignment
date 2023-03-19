import {defineConfig} from "cypress";
import webpackConfig from "./webpack.config";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig: async () => {
                const modConfig = await webpackConfig({production: false});
                return modConfig;
            }
        }
    },
    env: {
        development: true,
        production: false
    }
});
