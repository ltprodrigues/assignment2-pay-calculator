# Pay Calculator

COMP3074 Assignment 2 — Leticia Rodrigues, student ID 101559381.

## Run

```sh
npm ci
npx expo start
```

Open the project in Expo Go on Android. Keep the React Native Inspector off when testing normal interaction.

## Checks

```sh
npm run lint
npm run typecheck
```

TypeScript checks the existing JavaScript files; the screens remain separate JavaScript components.

## Android drawer workaround

The installed `react-native-drawer-layout@4.2.13` applied the panel width through a Reanimated style. On the tested Android device, the animation reached its open position but the native content measured zero width. The panel appeared while the Inspector was active.

The patch in `patches/` moves the calculated width into the regular React Native layout style, leaving translation animated. The drawer uses the supported `slide` presentation. Opening, closing, selecting About, and returning to Main were confirmed by the user with the Inspector off.

`patch-package --error-on-fail` runs after dependency installation. Commit the patch and lockfile together; do not commit `node_modules`. If the library is upgraded, review the patch and retest the drawer instead of silently discarding the workaround. Start Expo with `npx expo start -c` after changing the patched library.

This verifies a workaround for the observed layout failure, not the exact underlying React Native/Reanimated defect. The existing React Navigation setup is retained for this debugging milestone. Migration to Expo Router, required by `AGENTS.md`, remains a separate milestone; the current architecture is not the final assignment setup.

## Manual verification

- With the Inspector off, open and close the drawer three times.
- Select About, verify the name and student ID, and return using Back to Pay Calculator.
- Enter 40 hours, $20/hour, 15% tax: Pay $800, overtime $0, total $800, tax $120.
- Enter 45 hours, $20/hour, 15% tax: Pay $800, overtime $150, total $950, tax $120.
- Check empty, invalid, negative inputs and tax outside 0–100%.

Tax is calculated on regular pay, as required by the assignment.
