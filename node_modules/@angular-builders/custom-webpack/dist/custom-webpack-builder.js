"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWebpackBuilder = exports.defaultWebpackConfigPath = void 0;
const util_1 = require("util");
const core_1 = require("@angular-devkit/core");
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
const webpack_config_merger_1 = require("./webpack-config-merger");
exports.defaultWebpackConfigPath = 'webpack.config.js';
class CustomWebpackBuilder {
    static buildWebpackConfig(root, config, baseWebpackConfig, buildOptions, targetOptions, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!config) {
                return baseWebpackConfig;
            }
            const webpackConfigPath = config.path || exports.defaultWebpackConfigPath;
            const path = `${(0, core_1.getSystemPath)(root)}/${webpackConfigPath}`;
            const tsConfig = `${(0, core_1.getSystemPath)(root)}/${buildOptions.tsConfig}`;
            const configOrFactoryOrPromise = yield resolveCustomWebpackConfig(path, tsConfig, logger);
            if (typeof configOrFactoryOrPromise === 'function') {
                // The exported function can return a new configuration synchronously
                // or return a promise that resolves to a new configuration.
                const finalWebpackConfig = yield configOrFactoryOrPromise(baseWebpackConfig, buildOptions, targetOptions);
                logConfigProperties(config, finalWebpackConfig, logger);
                return finalWebpackConfig;
            }
            // The user can also export a promise that resolves to a `Configuration` object.
            // Suppose the following example:
            // `module.exports = new Promise(resolve => resolve({ ... }))`
            // This is valid both for promise and non-promise cases. If users export
            // a plain object, for instance, `module.exports = { ... }`, then it will
            // be wrapped into a promise and also `awaited`.
            const resolvedConfig = yield configOrFactoryOrPromise;
            const finalWebpackConfig = (0, webpack_config_merger_1.mergeConfigs)(baseWebpackConfig, resolvedConfig, config.mergeRules, config.replaceDuplicatePlugins);
            logConfigProperties(config, finalWebpackConfig, logger);
            return finalWebpackConfig;
        });
    }
}
exports.CustomWebpackBuilder = CustomWebpackBuilder;
function resolveCustomWebpackConfig(path, tsConfig, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, utils_1.tsNodeRegister)(path, tsConfig, logger);
        return (0, utils_1.loadModule)(path);
    });
}
function logConfigProperties(config, webpackConfig, logger) {
    var _a;
    // There's no reason to log the entire configuration object
    // since Angular's Webpack configuration is huge by default
    // and doesn't bring any meaningful context by being printed
    // entirely. Users can provide a list of properties they want to be logged.
    if ((_a = config.verbose) === null || _a === void 0 ? void 0 : _a.properties) {
        for (const property of config.verbose.properties) {
            const value = (0, lodash_1.get)(webpackConfig, property);
            if (value) {
                const message = (0, util_1.inspect)(value, /* showHidden */ false, config.verbose.serializationDepth);
                logger.info(message);
            }
        }
    }
}
//# sourceMappingURL=custom-webpack-builder.js.map