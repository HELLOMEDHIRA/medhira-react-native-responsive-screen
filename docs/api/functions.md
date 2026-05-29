# Functions

## `widthPercentageToDP(widthPercent)`

Converts a width percentage to device-independent pixels.

```tsx
import { widthPercentageToDP as wp } from 'medhira-react-native-responsive-screen';

wp('50%'); // half of screen width
wp(50);   // same as above (numeric input)
```

**Parameters:** `string | number` — percentage value, e.g. `'80%'` or `80`

**Returns:** `number` — width in dp

---

## `heightPercentageToDP(heightPercent)`

Converts a height percentage to device-independent pixels.

```tsx
import { heightPercentageToDP as hp } from 'medhira-react-native-responsive-screen';

hp('25%'); // quarter of screen height
```

**Parameters:** `string | number`

**Returns:** `number` — height in dp

---

## `getScreenWidth()`

Returns the current screen width in dp.

```tsx
import { getScreenWidth } from 'medhira-react-native-responsive-screen';

getScreenWidth(); // e.g. 390
```

---

## `getScreenHeight()`

Returns the current screen height in dp.

```tsx
import { getScreenHeight } from 'medhira-react-native-responsive-screen';

getScreenHeight(); // e.g. 844
```

---

## `listenOrientationChange(listener)`

Registers a listener for screen dimension changes.

**Class component:**

```tsx
listenOrientationChange(this);
```

**Functional component (callback):**

```tsx
listenOrientationChange((orientation) => {
  console.log(orientation); // 'portrait' | 'landscape'
});
```

Always pair with [`removeOrientationListener`](#removeorientationlistener) on unmount.

---

## `removeOrientationListener()`

Removes the active orientation listener. Call in `componentWillUnmount` or `useEffect` cleanup.

```tsx
removeOrientationListener();
```

---

## Constants

### `SCREEN_WIDTH`

Live binding to the current screen width. Updates when `listenOrientationChange` is active.

### `SCREEN_HEIGHT`

Live binding to the current screen height. Updates when `listenOrientationChange` is active.

!!! tip
    Prefer `getScreenWidth()` / `getScreenHeight()` in new code for clarity.
