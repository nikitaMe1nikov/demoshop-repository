import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flipVertical: {
    transform: [
      {
        scaleY: -1,
      },
    ],
  },
  hide: {
    display: 'none',
  },
  top: {
    elevation: 30,
    zIndex: 30,
  },
  // haveIndent: {
  //   paddingHorizontal: INDENT,
  // },
  // screen: {
  //   backgroundColor: BACKGROUND_COLOR,
  //   flex: 1,
  // },

  stretch: {
    flex: 1,
  },
  stretchAbsolute: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  stretchInPercent: {
    width: '100%',
    height: '100%',
  },
  childrenCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  childrenColumn: {
    flexDirection: 'column',
  },
  childrenRow: {
    flexDirection: 'row',
  },
  childrenMainCenter: {
    justifyContent: 'center',
  },
  childrenMainStart: {
    justifyContent: 'flex-start',
  },
  childrenMainEnd: {
    justifyContent: 'flex-end',
  },
  childrenMainAround: {
    justifyContent: 'space-around',
  },
  childrenMainBetween: {
    justifyContent: 'space-between',
  },
  childrenCrossCenter: {
    alignItems: 'center',
  },
  childrenCrossStart: {
    alignItems: 'flex-start',
  },
  childrenCrossEnd: {
    alignItems: 'flex-end',
  },
  childrenCrossAround: {
    alignContent: 'space-around',
  },
  childrenCrossBetween: {
    alignContent: 'space-between',
  },
  sizeToGrow: {
    flexGrow: 1,
  },

  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
});

export const {
  hide,
  flipVertical,
  top,

  stretch,
  stretchAbsolute,
  stretchInPercent,
  childrenCenter,
  childrenColumn,
  childrenRow,
  childrenMainCenter,
  childrenMainEnd,
  childrenMainStart,
  childrenCrossCenter,
  childrenCrossStart,
  childrenCrossEnd,
  childrenMainAround,
  childrenCrossAround,
  childrenMainBetween,
  childrenCrossBetween,
  sizeToGrow,

  textCenter,
  textLeft,
  textRight,
} = styles;
