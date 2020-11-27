import { connectStyle } from 'native-base-shoutem-theme';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StatusBar, SafeAreaView, StyleProp, ViewStyle, StatusBarStyle } from 'react-native';

function mapPropsToStyleNames(styleNames: any, props: any) {
  const keys = Object.keys(props);
  const values = Object.values(props);

  keys.forEach((key, index) => {
    if (values[index]) {
      styleNames.push(key);
    }
  });

  return styleNames;
}

function getStyle(style: any[]) {
  if (Array.isArray(style)) {
    return style.reduce((merged, nextStyle) => ({ ...merged, ...nextStyle }), {});
  }

  return style;
}

interface HeaderProps {
  style: StyleProp<ViewStyle>[];
  searchBar?: boolean;
  rounded?: boolean;
  androidStatusBarColor?: string;
  iosBarStyle?: StatusBarStyle;
  transparent?: boolean;
  translucent?: boolean;
}

class Header extends Component<HeaderProps> {
  static contextTypes = {
    theme: PropTypes.object,
  };

  render() {
    const { androidStatusBarColor, iosBarStyle, style, transparent, translucent } = this.props;

    const variables = this.context.theme['@@shoutem.theme/themeStyle'].variables;
    const platformStyle = variables.platformStyle;

    return (
      <View>
        <StatusBar
          backgroundColor={androidStatusBarColor ? androidStatusBarColor : variables.statusBarColor}
          barStyle={
            iosBarStyle
              ? iosBarStyle
              : platformStyle === 'material'
              ? 'light-content'
              : variables.iosStatusbar
          }
          translucent={transparent ? true : translucent}
        />
        <SafeAreaView
          style={{
            backgroundColor: getStyle(style).backgroundColor,
            elevation: getStyle(style).elevation,
          }}
        >
          <View {...this.props} />
        </SafeAreaView>
      </View>
    );
  }
}

export default connectStyle('NativeBase.Header', {}, mapPropsToStyleNames)(Header);
