import variable from './../variables/platform';

export default () => {
  const contentTheme = {
    flex: 1,
    backgroundColor: 'transparent',
    'NativeBase.Segment': {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    paddingVertical: variable.getSize(1),
  };

  return contentTheme;
};
