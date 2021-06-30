import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import colors from '../../assets/theme/colors';
import Icon from '../../components/common/Icon';
import ContactDetailsComponent from '../../components/ContactDetailsComponent';
import {CONTACT_LIST} from '../../constants/routeNames';
import deleteContact from '../../context/actions/contacts/deleteContact';
import editContact from '../../context/actions/contacts/editContact';
import {GlobalContext} from '../../context/Provider';
import uploadImage from '../../helpers/uploadImage';
import {navigate} from '../../navigations/SideMenu/RootNavigator';

const ContactDetails = () => {
  const {params: {item = {}} = {}} = useRoute();
  const {
    contactsDispatch,
    contactsState: {
      deleteContact: {loading},
    },
  } = useContext(GlobalContext);

  const {setOptions} = useNavigation();
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [uploadSucceeded, setUploadSuceeded] = useState(false);
  useEffect(() => {
    if (item) {
      setOptions({
        title: item.first_name + '' + item.last_name,
        headerRight: () => {
          return (
            <View style={{flexDirection: 'row', paddingRight: 10}}>
              <TouchableOpacity>
                <Icon
                  size={21}
                  color={colors.grey}
                  name={item.is_favorite ? 'star' : 'star-border'}
                  type="material"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => {
                  Alert.alert(
                    'DELETE!',
                    'Are you sure want to remove ' + '' + item.first_name,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                      },
                      {
                        text: 'Ok',
                        onPress: () => {
                          deleteContact(item.id)(contactsDispatch)(() => {
                            navigate(CONTACT_LIST);
                          });
                        },
                      },
                    ],
                  );
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Icon
                    size={21}
                    color={colors.grey}
                    name="delete"
                    type="material"
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        },
      });
    }
  }, [item, loading]);
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const onFileSelected = image => {
    closeSheet();
    setLocalFile(image);
    setUpdatingImage(true);
    uploadImage(image)(url => {
      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        country_code: phoneCode,
        is_favorite: isFavorite,
      } = item;

      editContact(
        {
          firstName,
          lastName,
          phoneNumber,
          isFavorite,
          phoneCode,
          contactPicture: url,
        },
        item.id,
      )(contactsDispatch)(item => {
        setUpdatingImage(true);
        setUploadSuceeded(true);
        //  navigate(CONTACT_DETAIL, {item});
      });
    })(err => {
      console.log(`err ire`, err);
      setUpdatingImage(false);
    });
  };

  return (
    <ContactDetailsComponent
      sheetRef={sheetRef}
      onFileSelected={onFileSelected}
      openSheet={openSheet}
      contact={item}
      localFile={localFile}
      updatingImage={updatingImage}
      uploadSucceeded={uploadSucceeded}
    />
  );
};

export default ContactDetails;
