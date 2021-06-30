import storage from '@react-native-firebase/storage';

export default file => onSuccess => onError => {
  const path = `contact-pictures/user/777/${file.filename || new Date()}`;
  console.log(`file`, file);
  const ref = storage().ref(path);

  const task = ref.putFile(file.path);

  task
    .then(async () => {
      const url = await ref.getDownloadURL();
      onSuccess(url);
      console.log('url uploadImage', url);
    })
    .catch(error => {
      onError(error);
    });
};
