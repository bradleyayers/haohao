# haohao.how

[![CI](https://github.com/bradleyayers/haohaohow/actions/workflows/release.yml/badge.svg)](https://github.com/bradleyayers/haohaohow/actions/workflows/release.yml)

## Setup

Install [proto](https://moonrepo.dev/proto):

```sh
curl -fsSL https://moonrepo.dev/install/proto.sh | bash
proto use
```

## Running scripts with moon

```sh
moon app:dev
```

# Cookbook

## Debugging Expo server

In VS Code open a `JavaScript Debug Terminal` from the command palette
<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>p</kbd>, then run commands as normal e.g.

```sh
moon run app:dev
```

This works because VS Code configures `NODE_OPTIONS` in the terminal to
`--require` a special `bootloader.js`, so it's important that moon tasks that
define `NODE_OPTIONS` pass through the existing value.

## Adding a cross project dependency

Add to `dependsOn:` within `moon.yml`, then run:

```sh
moon sync projects
```

This will update `package.json/dependencies`, `tsconfig.json/references`, `tsconfig.json/compilerOptions/paths`.

## Upgrading Yarn

Inside `toolchain.yml` edit `node.yarn.version` and update the version. Run
`moon sync projects` to apply the change.

## Upgrading Moon

```sh
proto outdated --update
proto use
```

## Upgrading Proto

```sh
proto upgrade
```

## Upgrading Node.js

Edit `.moon/toolchain.yml` edit `node.version`.

```sh
moon run node-version
```

Moon will automatically synchronize `package.json` `engines.node`, and it will
use proto to download and install the right version of Node.js.

## Upgrading a transitive Yarn dependency (e.g. for security patch)

A normal `yarn up ___` won't work if no workspace depends on it directly, so you
need to use `--recursive`. For example to upgrade `tar` use:

```sh
yarn up -R tar
```

## Upgrading a dependency with a Yarn patch

Yarn doesn't automatically migrate patches, so you need to migrate it manually.

```sh
yarn patch expo-image
patch -d /private/var/folders/fs/...snip.../T/xfs-33350073/user < .yarn/patches/expo-image-npm-1.12.9-116d224baf.patch
yarn patch-commit -s /private/var/folders/fs/...snip.../T/xfs-33350073/user
rm .yarn/patches/expo-image-npm-1.12.9-116d224baf.patch
```

## Updating app icons

Icons can be exported directly from Figma. Frames are labelled appropriately
such that everything in Figma can be exported to the
`projects/app/src/assets` directory.

## Writing Pinyin on macOS

1. Enable the `Pinyin - Simplified` keyboard.
1. Type the pinyin without the tone (e.g. `hao`).
1. Press <kbd>Tab</kbd> to cycle through each tone.
1. Press <kbd>Enter</kbd> to accept the pinyin.

Example: to write `hǎo` type <kbd>h</kbd> <kbd>a</kbd> <kbd>o</kbd> <kbd>Tab</kbd> <kbd>Tab</kbd> <kbd>Tab</kbd> <kbd>Enter</kbd>.

## Local development with Sign in with Apple for Web

1. Set `EXPO_TUNNEL_SUBDOMAIN` in `projects/app/.env.local` to something like
   `haohaohow-<yourname>`.
1. In [Apple Developer portal](https://developer.apple.com/account/resources/identifiers/list/serviceId) edit the Service ID for the app and click **Configure**.
1. Click the + button for **Website URLs**, in the **Return URLs** box add
   `https://<EXPO_TUNNEL_SUBDOMAIN>.ngrok.io/api/auth/login/apple/callback`
   (replace `<EXPO_TUNNEL_SUBDOMAIN>` with the value you chose).
1. Save the changes.
1. Start Expo via `moon run app:dev`.
