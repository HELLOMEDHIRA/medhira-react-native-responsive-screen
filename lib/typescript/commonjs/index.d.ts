export type Orientation = 'portrait' | 'landscape';
export type OrientationListener = ((orientation: Orientation) => void) | {
    setState: (state: {
        orientation: Orientation;
    }) => void;
};
declare let SCREEN_WIDTH: number;
declare let SCREEN_HEIGHT: number;
/**
 * Returns the current screen width in dp.
 */
declare const getScreenWidth: () => number;
/**
 * Returns the current screen height in dp.
 */
declare const getScreenHeight: () => number;
/**
 * Converts a width percentage to independent pixels (dp).
 */
declare const widthPercentageToDP: (widthPercent: string | number) => number;
/**
 * Converts a height percentage to independent pixels (dp).
 */
declare const heightPercentageToDP: (heightPercent: string | number) => number;
/**
 * Listens for orientation changes and triggers a re-render.
 * Pass a class component instance or a state setter callback.
 */
declare const listenOrientationChange: (listener: OrientationListener) => void;
/**
 * Removes the orientation change listener.
 * Call this in componentWillUnmount or in a useEffect cleanup.
 */
declare const removeOrientationListener: () => void;
/**
 * React hook for responsive layouts with live dimension updates.
 */
declare const useResponsiveScreen: () => {
    wp: (widthPercent: string | number) => number;
    hp: (heightPercent: string | number) => number;
    width: number;
    height: number;
    orientation: Orientation;
};
export { SCREEN_WIDTH, SCREEN_HEIGHT, getScreenWidth, getScreenHeight, widthPercentageToDP, heightPercentageToDP, listenOrientationChange, removeOrientationListener, useResponsiveScreen, };