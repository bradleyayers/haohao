// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require(`expo/metro-config`);
const { withSentryConfig } = require(`@sentry/react-native/metro`);
const { withNativeWind } = require(`nativewind/metro`);

let config = getDefaultConfig(__dirname);

// Force invalid require(…) calls to error on build rather than runtime.
config.transformer.dynamicDepsInPackages = `reject`;

// Fixes "Metro has encountered an error: While trying to resolve module `replicache-react`"
config.resolver.unstable_enablePackageExports = true;

config = withNativeWind(config, { input: `./src/global.css`, inlineRem: 16 });

// Doing Sentry last is probably important so that the hashed debug IDs are
// based on the final content of the final and aren't stripped by any other
// processors.
config = withSentryConfig(config);

module.exports = config;
