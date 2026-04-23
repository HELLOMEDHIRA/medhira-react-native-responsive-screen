"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widthPercentageToDP = exports.listenOrientationChange = exports.heightPercentageToDP = exports.SCREEN_WIDTH = exports.SCREEN_HEIGHT = void 0;
var _reactNative = require("react-native");
// Retrieve initial screen's width
let screenWidth = exports.SCREEN_WIDTH = _reactNative.Dimensions.get('window').width;

// Retrieve initial screen's height
let screenHeight = exports.SCREEN_HEIGHT = _reactNative.Dimensions.get('window').height;
const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return _reactNative.PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
exports.widthPercentageToDP = widthPercentageToDP;
const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return _reactNative.PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
exports.heightPercentageToDP = heightPercentageToDP;
const listenOrientationChange = that => {
  _reactNative.Dimensions.addEventListener('change', newDimensions => {
    // Retrieve and save new dimensions
    exports.SCREEN_WIDTH = screenWidth = newDimensions.window.width;
    exports.SCREEN_HEIGHT = screenHeight = newDimensions.window.height;

    // Trigger screen's rerender with a state update of the orientation variable
    that.setState({
      orientation: screenWidth < screenHeight ? 'portrait' : 'landscape'
    });
  });
};
exports.listenOrientationChange = listenOrientationChange;
//# sourceMappingURL=index.js.map