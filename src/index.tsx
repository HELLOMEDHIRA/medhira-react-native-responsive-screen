import { useCallback, useEffect, useState } from 'react';
import { Dimensions, PixelRatio, type ScaledSize } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

export type OrientationListener =
  | ((orientation: Orientation) => void)
  | {
      setState: (state: { orientation: Orientation }) => void;
    };

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

let dimensionSubscription: { remove: () => void } | null = null;
let orientationHandler: ((dimensions: { window: ScaledSize }) => void) | null =
  null;

const parsePercent = (value: string | number): number => {
  const parsed = typeof value === 'number' ? value : parseFloat(value);

  if (typeof __DEV__ !== 'undefined' && __DEV__ && Number.isNaN(parsed)) {
    console.warn(
      '[medhira-react-native-responsive-screen] Invalid percentage value:',
      value,
    );
  }

  return parsed;
};

const getOrientation = (): Orientation =>
  SCREEN_WIDTH < SCREEN_HEIGHT ? 'portrait' : 'landscape';

const updateScreenDimensions = (window: ScaledSize): void => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
};

/**
 * Returns the current screen width in dp.
 */
const getScreenWidth = (): number => SCREEN_WIDTH;

/**
 * Returns the current screen height in dp.
 */
const getScreenHeight = (): number => SCREEN_HEIGHT;

/**
 * Converts a width percentage to independent pixels (dp).
 */
const widthPercentageToDP = (widthPercent: string | number): number => {
  const percent = parsePercent(widthPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * percent) / 100);
};

/**
 * Converts a height percentage to independent pixels (dp).
 */
const heightPercentageToDP = (heightPercent: string | number): number => {
  const percent = parsePercent(heightPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * percent) / 100);
};

const notifyOrientationListener = (listener: OrientationListener): void => {
  const orientation = getOrientation();

  if (typeof listener === 'function') {
    listener(orientation);
    return;
  }

  listener.setState({ orientation });
};

/**
 * Listens for orientation changes and triggers a re-render.
 * Pass a class component instance or a state setter callback.
 */
const listenOrientationChange = (listener: OrientationListener): void => {
  removeOrientationListener();

  orientationHandler = ({ window }) => {
    updateScreenDimensions(window);
    notifyOrientationListener(listener);
  };

  dimensionSubscription = Dimensions.addEventListener(
    'change',
    orientationHandler,
  );
};

/**
 * Removes the orientation change listener.
 * Call this in componentWillUnmount or in a useEffect cleanup.
 */
const removeOrientationListener = (): void => {
  dimensionSubscription?.remove();
  dimensionSubscription = null;
  orientationHandler = null;
};

/**
 * React hook for responsive layouts with live dimension updates.
 */
const useResponsiveScreen = () => {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation);
  const [width, setWidth] = useState(getScreenWidth);
  const [height, setHeight] = useState(getScreenHeight);

  useEffect(() => {
    const listener = (nextOrientation: Orientation) => {
      setOrientation(nextOrientation);
      setWidth(getScreenWidth());
      setHeight(getScreenHeight());
    };

    listenOrientationChange(listener);

    return () => {
      removeOrientationListener();
    };
  }, []);

  const wp = useCallback(widthPercentageToDP, []);
  const hp = useCallback(heightPercentageToDP, []);

  return {
    wp,
    hp,
    width,
    height,
    orientation,
  };
};

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  getScreenWidth,
  getScreenHeight,
  widthPercentageToDP,
  heightPercentageToDP,
  listenOrientationChange,
  removeOrientationListener,
  useResponsiveScreen,
};
