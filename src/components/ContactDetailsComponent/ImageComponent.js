import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const ImageComponent = ({src}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, sethasError] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onLoadEnd = () => {
    setIsLoading(false);
  };
  const onError = () => {
    setIsLoading(false);
    sethasError(true);
  };

  return (
    <View style={styles.imageContainer}>
      {isLoading && <Text style={styles.loading}>Loading Image</Text>}
      <View>
        <Image
          onLoadEnd={onLoadEnd}
          onError={onError}
          onLoadStart={onLoadStart}
          style={styles.detailPhoto}
          source={{uri: src}}
        />
      </View>
    </View>
  );
};

export default ImageComponent;
