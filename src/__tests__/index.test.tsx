import { renderHook, act } from '@testing-library/react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  getScreenWidth,
  getScreenHeight,
  listenOrientationChange,
  removeOrientationListener,
  useResponsiveScreen,
} from '../index';

type MockReactNativeState = {
  dimensions: {
    width: number;
    height: number;
    scale: number;
    fontScale: number;
  };
  dimensionListeners: Array<
    (dimensions: { window: { width: number; height: number } }) => void
  >;
};

declare global {
  var __mockReactNativeState: MockReactNativeState;
}

jest.mock('react-native', () => {
  const state: MockReactNativeState = {
    dimensions: {
      width: 400,
      height: 800,
      scale: 2,
      fontScale: 2,
    },
    dimensionListeners: [],
  };

  globalThis.__mockReactNativeState = state;

  return {
    Dimensions: {
      get: jest.fn(() => state.dimensions),
      addEventListener: jest.fn(
        (
          _event: string,
          handler: (dimensions: {
            window: { width: number; height: number };
          }) => void,
        ) => {
          state.dimensionListeners.push(handler);

          return {
            remove: jest.fn(() => {
              const index = state.dimensionListeners.indexOf(handler);

              if (index >= 0) {
                state.dimensionListeners.splice(index, 1);
              }
            }),
          };
        },
      ),
    },
    PixelRatio: {
      roundToNearestPixel: (value: number) => Math.round(value),
    },
  };
});

const getMockState = () => globalThis.__mockReactNativeState;

const triggerDimensionChange = (width: number, height: number) => {
  getMockState().dimensionListeners.forEach((listener) => {
    listener({ window: { width, height } });
  });
};

const resetDimensions = () => {
  removeOrientationListener();
  const state = getMockState();
  state.dimensions = {
    width: 400,
    height: 800,
    scale: 2,
    fontScale: 2,
  };
  state.dimensionListeners.length = 0;

  listenOrientationChange(() => {});
  triggerDimensionChange(400, 800);
  removeOrientationListener();
};

beforeEach(() => {
  resetDimensions();
});

afterEach(() => {
  resetDimensions();
});

describe('widthPercentageToDP', () => {
  it('converts a string percentage to dp', () => {
    expect(widthPercentageToDP('50%')).toBe(200);
  });

  it('converts a numeric percentage to dp', () => {
    expect(widthPercentageToDP(25)).toBe(100);
  });
});

describe('heightPercentageToDP', () => {
  it('converts a string percentage to dp', () => {
    expect(heightPercentageToDP('50%')).toBe(400);
  });

  it('converts a numeric percentage to dp', () => {
    expect(heightPercentageToDP(10)).toBe(80);
  });
});

describe('getScreenWidth and getScreenHeight', () => {
  it('returns the current screen dimensions', () => {
    expect(getScreenWidth()).toBe(400);
    expect(getScreenHeight()).toBe(800);
  });
});

describe('listenOrientationChange', () => {
  it('registers a dimension change listener', () => {
    const { Dimensions } = jest.requireMock('react-native') as {
      Dimensions: { addEventListener: jest.Mock };
    };
    const setState = jest.fn();

    listenOrientationChange({ setState });

    expect(Dimensions.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('updates dimensions and notifies a callback listener', () => {
    const onOrientationChange = jest.fn();

    listenOrientationChange(onOrientationChange);
    triggerDimensionChange(800, 400);

    expect(onOrientationChange).toHaveBeenCalledWith('landscape');
    expect(widthPercentageToDP('50%')).toBe(400);
  });

  it('updates dimensions and notifies a class component listener', () => {
    const setState = jest.fn();

    listenOrientationChange({ setState });
    triggerDimensionChange(800, 400);

    expect(setState).toHaveBeenCalledWith({ orientation: 'landscape' });
  });

  it('does not accumulate duplicate listeners on remount', () => {
    const first = jest.fn();
    const second = jest.fn();

    listenOrientationChange(first);
    listenOrientationChange(second);
    triggerDimensionChange(800, 400);

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('landscape');
  });
});

describe('removeOrientationListener', () => {
  it('removes the active dimension listener', () => {
    const onOrientationChange = jest.fn();

    listenOrientationChange(onOrientationChange);
    removeOrientationListener();
    triggerDimensionChange(800, 400);

    expect(onOrientationChange).not.toHaveBeenCalled();
  });
});

describe('useResponsiveScreen', () => {
  it('returns responsive helpers and updates on orientation change', async () => {
    const { result } = renderHook(() => useResponsiveScreen());

    expect(result.current.width).toBe(400);
    expect(result.current.height).toBe(800);
    expect(result.current.orientation).toBe('portrait');
    expect(result.current.wp('50%')).toBe(200);

    await act(async () => {
      triggerDimensionChange(800, 400);
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(400);
    expect(result.current.orientation).toBe('landscape');
    expect(result.current.hp('50%')).toBe(200);
  });
});
