import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import {LOGIN} from '../../constants/routeNames';
import styles from './styles';
import Message from '../common/Message';

const RegisterComponent = ({
  onSubmit,
  onChange,
  form,
  loading,
  error,
  errors,
}) => {
  const {navigate} = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={require('../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subTitle}>Create a free acount</Text>

        <View style={styles.form}>
          {console.log('system error happend', error)}
          {error?.error && (
            <Message
              retry
              danger
              retryFn={() => {
                console.log('222', 222);
              }}
              message={error?.error}
            />
          )}

          <Input
            label="Username"
            iconPosition="right"
            placeholder="Enter Username"
            error={errors.username || error?.username?.[0]}
            onChangeText={value => {
              onChange({name: 'userName', value});
            }}
          />

          <Input
            label="First name"
            iconPosition="right"
            placeholder="Enter First name"
            error={errors.firstName || error?.first_name?.[0]}
            onChangeText={value => {
              onChange({name: 'firstName', value});
            }}
          />

          <Input
            label="Last Name"
            iconPosition="right"
            placeholder="Enter Last Name"
            error={errors.lastName || error?.last_name?.[0]}
            onChangeText={value => {
              onChange({name: 'lastName', value});
            }}
          />
          <Input
            label="Email"
            iconPosition="right"
            placeholder="Enter email"
            error={errors.email || error?.email?.[0]}
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={isSecureEntry}
            icon={<Text>Show</Text>}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            error={errors.password || error?.password?.[0]}
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
          />

          <CustomButton
            loading={loading}
            onPress={onSubmit}
            disabled={loading}
            primary
            title="Submit"
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Already have a account</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(LOGIN);
              }}>
              <Text style={styles.linkBtn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};
export default RegisterComponent;
