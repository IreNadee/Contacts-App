import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import Container from '../common/Container';
import {REGISTER} from '../../constants/routeNames';
import styles from './styles';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import Message from '../common/Message';

const LoginComponent = ({
  error,
  form,
  onChange,
  justSignedUp,
  onSubmit,
  loading,
}) => {
  const {navigate} = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subTitle}>Please login here</Text>
        {justSignedUp && (
          <Message
            onDismiss={() => {}}
            success
            message="Account created successfully"
          />
        )}
        {error && !error.error && (
          <Message onDismiss={() => {}} danger message="invalid credential" />
        )}

        <View style={styles.form}>
          {error?.error && <Message danger onDismiss message={error?.error} />}
          <Input
            label="Username"
            iconPosition="right"
            value={form.userName || null}
            placeholder="Enter username"
            onChangeText={value => {
              onChange({name: 'userName', value});
            }}
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
          />
          <CustomButton
            disabled={loading}
            onPress={onSubmit}
            loading={loading}
            primary
            title="Submit"
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Need a new account</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(REGISTER);
              }}>
              <Text style={styles.linkBtn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};
export default LoginComponent;
