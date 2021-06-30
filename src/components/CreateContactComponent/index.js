import React from 'react';
import {View, Text, Image, Switch, TouchableOpacity} from 'react-native';
import styles from './styles';
import Input from '../common/Input';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import CountryPicker from 'react-native-country-picker-modal';
import {DEFAULT_IMAGE_URI} from '../../constants/general';
import colors from '../../assets/theme/colors';
import ImagePicker from '../common/ImagePicker';

const CreateContactComponent = ({
  onChangeText,
  loading,
  error,
  onSubmit,
  form,
  setForm,
  toggleValueChange,
  sheetRef,
  openSheet,
  localFile,
  onFileSelected,
}) => {
  console.log(`localFile 88`, localFile);
  return (
    <View style={styles.container}>
      <Container>
        <Image
          width={150}
          height={150}
          source={{uri: localFile?.path || localFile || DEFAULT_IMAGE_URI}}
          style={styles.imageView}
        />
        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.chooseText}>Choose image</Text>
        </TouchableOpacity>

        <Input
          onChangeText={value => {
            onChangeText({name: 'firstName', value: value});
          }}
          value={form.firstName || ''}
          label="First name"
          placeholder="Enter First name"
          error={error?.first_name?.[0]}
        />
        <Input
          error={error?.last_name?.[0]}
          onChangeText={value => {
            onChangeText({name: 'lastName', value: value});
          }}
          value={form.lastName || ''}
          label="Last name"
          placeholder="Enter Last name"
        />
        <Input
          icon={
            <CountryPicker
              withFilter
              withFlag
              countryCode={form.countryCode || undefined}
              withCountryNameButton={false}
              withCallingCode
              withCallingCodeButton
              withEmoji
              onSelect={v => {
                const phoneCode = v.callingCode[0];
                const cCode = v.cca2;
                setForm({...form, phoneCode, countryCode: cCode});
              }}
            />
          }
          style={{paddingLeft: 10}}
          iconPosition="left"
          error={error?.phone_number?.[0]}
          onChangeText={value => {
            onChangeText({name: 'phoneNumber', value: value});
          }}
          value={form.phoneNumber || ''}
          label="Phone Number"
          placeholder="Enter Phone Number"
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 17}}>Add to favorites</Text>
          <Switch
            trackColor={{false: 'blue', true: colors.primary}}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValueChange}
            value={form.isFavorite}
          />
        </View>
        <CustomButton
          loading={loading}
          disabled={loading}
          onPress={onSubmit}
          primary
          title="Submit"
        />
      </Container>
      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </View>
  );
};

export default CreateContactComponent;
