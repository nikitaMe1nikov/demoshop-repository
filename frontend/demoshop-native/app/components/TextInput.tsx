import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native';
import { Text, Header, Content, Form, Item, Input, Label, NativeBase } from 'native-base';
import { FormStore } from '@nimel/directorr-form';
import { stretch } from 'components/layoutStyles';
import platform from 'theme/variables/platform';

const styles = StyleSheet.create({
  message: {
    position: 'absolute',
    bottom: -platform.getSize(3) - 2,
    right: 0,
    color: platform.brandDanger,
  },
  item: {
    marginBottom: platform.getSize(2),
  },
});

type TextInputProps = NativeBase.Input & {
  style?: StyleProp<ViewStyle & TextStyle>;
  store: FormStore;
  label: string;
};

const TextInput: FC<TextInputProps> = ({ style, store, label, ...rest }) => {
  const handleChange = useCallback(
    (text) => {
      store.changeValue(text.trim());
    },
    [store]
  );

  return (
    <View style={[stretch, style]}>
      <Item floatingLabel style={[stretch, styles.item]} error={store.isInvalid}>
        <Label>{label}</Label>
        <Input
          value={store.value}
          onChangeText={handleChange}
          onFocus={store.focus}
          onBlur={store.blur}
          onSubmitEditing={store.submit}
          {...rest}
        />
      </Item>
      {store.isInvalid && <Text style={styles.message}>{store.message}</Text>}
    </View>
  );
};

export default observer(TextInput);
