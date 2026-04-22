<p align="center">
  <img src="https://raw.githubusercontent.com/HELLOMEDHIRA/medhira/main/assets/medhira-logo.png" alt="MEDHIRA Logo" width="200"/>
</p>

<p align="center">
  <strong>Engineering Intelligence Across Everything</strong>
</p>

---

# medhira-react-native-responsive-screen

Responsive screen utilities for React Native - convert percentages to responsive dimensions.

## Why MEDHIRA?

- **Responsive Layouts** - Easy percentage-to-pixel conversion
- **Orientation Support** - Listen for orientation changes
- **TypeScript** - Full type definitions
- **Lightweight** - Zero dependencies

## Installation

```bash
# Expo
npx expo install medhira-react-native-responsive-screen

# React Native
npm install --save medhira-react-native-responsive-screen
```

## Usage

```js
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'medhira-react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: hp('70%'), // 70% of height
    width: wp('80%')   // 80% of width
  },
  myText: {
    fontSize: hp('5%') // 5% of height
  }
});
```

## API

| Function | Description |
|----------|-------------|
| `widthPercentageToDP` | Convert width % to pixels |
| `heightPercentageToDP` | Convert height % to pixels |
| `listenOrientationChange` | Listen for orientation changes |
| `SCREEN_WIDTH` | Current screen width |
| `SCREEN_HEIGHT` | Current screen height |

## Contributing

Contributions welcome!

## Sponsor & Support

- GitHub: https://github.com/HELLOMEDHIRA
- Email: hello.medhira@gmail.com

## About MEDHIRA

**MEDHIRA** - Engineering Intelligence Across Everything

- Website: https://medhira.readthedocs.io/en/latest/
- GitHub: https://github.com/HELLOMEDHIRA

---

## License

MIT

---

Made with passion by MEDHIRA