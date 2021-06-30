import React, {useState} from 'react';
import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const Message = ({
  message,
  onDismiss,
  retry,
  retryFn,
  primary,
  danger,
  info,
  success,
  style,
}) => {
  const [userDismissed, setDismissed] = useState(false);
  const getBgColor = () => {
    if (primary) {
      return colors.primary;
    }
    if (danger) {
      return colors.danger;
    }
    if (success) {
      return colors.success;
    }

    if (info) {
      return colors.secondary;
    }
  };
  return (
    <>
      {userDismissed ? null : (
        <TouchableOpacity
          style={[styles.wrapper, {backgroundColor: getBgColor()}, style]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: colors.white,
              }}>
              {message}
            </Text>
            {retry && !typeof onDismiss === 'function' && (
              <TouchableOpacity onPress={retryFn}>
                <Text style={{color: colors.white}}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>
          {typeof onDismiss === 'function' && (
            <TouchableOpacity
              onPress={() => {
                setDismissed(true);
                onDismiss();
              }}>
              <Text
                style={{
                  color: colors.white,
                }}>
                X
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default Message;
