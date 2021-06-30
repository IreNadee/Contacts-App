import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import {GlobalContext} from '../../context/Provider';
import CreateContactComponent from '../../components/CreateContactComponent';
import createContact from '../../context/actions/contacts/createContact';
import {CONTACT_DETAIL, CONTACT_LIST} from '../../constants/routeNames';
import {useNavigation, useRoute} from '@react-navigation/native';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';
import editContact from '../../context/actions/contacts/editContact';

const CreateContact = () => {
  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error},
    },
  } = useContext(GlobalContext);
  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsuploading] = useState(false);
  const {navigate, setOptions} = useNavigation();
  const {params} = useRoute();
  const [localFile, setLocalFile] = useState(null);

  useEffect(() => {
    console.log(`params >>>>>>>>>>`, params);
    if (params?.contact) {
      setOptions({title: 'Update Contact'});
      const {
        first_name: firstName,
        phone_number: phoneNumber,
        last_name: lastName,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.contact;

      setForm(prev => {
        return {
          ...prev,
          firstName,
          isFavorite,
          phoneNumber,
          lastName,
          phoneCode: countryCode,
        };
      });

      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === countryCode;
      });

      if (country) {
        setForm(prev => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }

      if (params?.contact?.contact_picture) {
        setLocalFile(params?.contact.contact_picture);
      }
    }
  }, []);

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    if (params?.contact) {
      if (localFile?.size) {
        setIsuploading(true);
        uploadImage(localFile)(url => {
          setIsuploading(false);
          editContact(
            {...form, contactPicture: url},
            params?.contact.id,
          )(contactsDispatch)(item => {
            navigate(CONTACT_DETAIL, {item});
          });
        })(err => {
          console.log(`err ire`, err);
          setIsuploading(false);
        });
      } else {
        editContact(form, params?.contact.id)(contactsDispatch)(item => {
          navigate(CONTACT_DETAIL, {item});
        });
      }
    } else {
      if (localFile?.size) {
        setIsuploading(true);
        uploadImage(localFile)(url => {
          setIsuploading(false);
          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(err => {
          setIsuploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigate(CONTACT_LIST);
        });
      }
    }
  };
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
  };
  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      toggleValueChange={toggleValueChange}
      setForm={setForm}
      loading={loading || uploading}
      error={error}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile={localFile}
    />
  );
};

export default CreateContact;
