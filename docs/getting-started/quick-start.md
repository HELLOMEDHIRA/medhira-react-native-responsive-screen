# Quick Start

## Basic usage

Import the helpers using aliases for cleaner code:

```tsx
import { StyleSheet, View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'medhira-react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: wp('80%'),   // 80% of screen width
    height: hp('70%'), // 70% of screen height
  },
  title: {
    fontSize: hp('3%'),
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Responsive layout</Text>
    </View>
  );
}
```

## When to use `wp` vs `hp`

| Use | For |
|-----|-----|
| `wp()` | Width, horizontal padding/margin, horizontal spacing |
| `hp()` | Height, font size, vertical padding/margin |

## With orientation support

For screens that rotate, see the [Orientation Changes](../guides/orientation.md) guide or use the [`useResponsiveScreen`](../api/hooks.md) hook.

## Next

- [Functions API](../api/functions.md)
- [Hooks API](../api/hooks.md)
