import { NativeBase } from 'native-base';
import { ScrollViewProps } from 'react-native';

declare module 'native-base' {
  namespace NativeBase {
    export interface Content extends NativeBase.Content, ScrollViewProps {
      refreshControl?: any;
    }
  }
}
