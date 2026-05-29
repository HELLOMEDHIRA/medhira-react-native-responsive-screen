# Installation

## Requirements

- React Native >= 0.60
- React >= 16.8 (required for `useResponsiveScreen`)

## Expo

```bash
npx expo install medhira-react-native-responsive-screen
```

## React Native CLI

=== "npm"

    ```bash
    npm install medhira-react-native-responsive-screen
    ```

=== "yarn"

    ```bash
    yarn add medhira-react-native-responsive-screen
    ```

## TypeScript

Type definitions are included — no additional `@types` package is required.

## Verify installation

```tsx
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'medhira-react-native-responsive-screen';

console.log(wp('50%'), hp('50%'));
```
