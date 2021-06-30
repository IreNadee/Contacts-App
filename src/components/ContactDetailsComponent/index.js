import {useNavigation, useState} from '@react-navigation/native';
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import CustomButton from '../common/CustomButton';
import styles from './styles';
import ImageComponent from './ImageComponent';
import Icon from '../common/Icon';
import colors from '../../assets/theme/colors';
import ImagePicker from '../common/ImagePicker';
import {CREATE_CONTACT} from '../../constants/routeNames';
import {DEFAULT_IMAGE_URI} from '../../constants/general';

const ContactDetailsComponent = ({
  contact,
  openSheet,
  sheetRef,
  onFileSelected,
  updatingImage,
  localFile,
  uploadSucceeded,
}) => {
  const {navigate} = useNavigation();
  const {contact_picture, first_name, country_code, phone_number, last_name} =
    contact;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {(contact_picture || uploadSucceeded) && (
          <ImageComponent src={contact_picture || localFile?.path} />
        )}
        {!contact_picture && !uploadSucceeded && (
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <Image
              width={150}
              height={150}
              source={{uri: localFile?.path || DEFAULT_IMAGE_URI}}
              style={styles.imageView}
            />
            <TouchableOpacity
              onPress={() => {
                openSheet();
              }}>
              <Text style={{color: colors.primary}}>
                {updatingImage ? 'updating...' : 'Add Picture'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.names}>{first_name + '' + last_name}</Text>
        </View>
        <View style={styles.hrLine} />
        <View style={styles.topCallOptions}>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="ionicon"
              name="call-outline"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="materialCommunity"
              name="message-text"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="materialCommunity"
              name="video"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hrLine} />
        <View style={styles.middleCallOptions}>
          <Icon
            type="ionicon"
            name="call-outline"
            color={colors.grey}
            size={27}
          />
          <View style={styles.phoneMobile}>
            <Text>{phone_number}</Text>
            <Text>Mobile</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              type="materialCommunity"
              name="video"
              color={colors.primary}
              size={27}
            />
            <Icon
              type="materialCommunity"
              name="message-text"
              color={colors.primary}
              size={27}
              style={[styles.msgIcon]}
            />
          </View>
        </View>
        <CustomButton
          style={{alignSelf: 'flex-end', marginRight: 20, width: 200}}
          primary
          title="Edit Contact"
          onPress={() => {
            navigate(CREATE_CONTACT, {contact, editing: true});
          }}
        />
        <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
      </View>
    </ScrollView>
  );
};

export default ContactDetailsComponent;
