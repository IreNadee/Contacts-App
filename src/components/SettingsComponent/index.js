import React from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import colors from '../../assets/theme/colors';
import AppModal from '../common/AppModal';
import Icon from '../common/Icon';

const SettingsComponent = ({
  settingsOptions,
  modalVisible,
  setModalVisible,
  prefArr,
}) => {
  return (
    <>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        closeOnTouchOutside={false}
        title="Sort by"
        modalBody={
          <View>
            {prefArr.map(({name, selected, onPress}) => (
              <View>
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  {selected && <Icon name="check" size={17} />}
                  <Text style={{fontSize: 17, paddingLeft: selected ? 15 : 30}}>
                    {name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        }
        modalFooter={<></>}
      />

      <ScrollView style={{backgroundColor: colors.white}}>
        {settingsOptions.map(({title, subTitle, onPress}, index) => (
          <TouchableOpacity key={title} onPress={onPress}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 20,
              }}>
              <Text style={{fontSize: 17}}>{title}</Text>
              {subTitle && (
                <Text style={{fontSize: 14, color: colors.grey, paddingTop: 5}}>
                  {subTitle}
                </Text>
              )}
            </View>
            <View style={{height: 0.5, backgroundColor: colors.grey}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default SettingsComponent;
