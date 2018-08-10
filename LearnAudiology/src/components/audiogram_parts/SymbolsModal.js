import React from 'react';
import { Text, View, Modal, Image, TouchableOpacity } from 'react-native';
import { Badge, Icon } from 'react-native-elements';

const Symbols = (props) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={ true }
        visible={ props.visible }
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginTop: '15.5%'
          }}
          onPress={() => {
            props.parent.setSymbolsVisible(!props.visible);
          }}
        >
          <View>
            <View style={{
              backgroundColor: '#fff',
              width: '70%',
              height: 160,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                width: '60%'
              }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Text>KEY</Text>
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Text>AC Unmasked</Text>
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Text>AC Masked</Text>
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Text>BC Unmasked</Text>
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Text>BC Masked</Text>
                  </View>
                  <View style={{ padding: 5, paddingBottom: 10,
                    flex: 1, alignSelf: 'center' }}>
                    <Text>No response</Text>
                  </View>
                </View>
              </View>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                width: '40%'
              }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Text>RIGHT</Text>
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/PFXczIl.png' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/kv5twnR.png' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/u4Zfi3I.png?1' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/Wmg6zem.png' }}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Text>LEFT</Text>
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/VqJdazw.png' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/6KrOAuH.png' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/2q2Nglb.png' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/PO8NtHf.png?1' }}
                    />
                  </View>
                  <View style={{ padding: 5, flex: 1, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: 'https://i.imgur.com/N4NDGBm.png' }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Icon
              name="close"
              containerStyle={{
                position: 'absolute',
                top: -35,
                right: -35,
                borderColor: 'rgb(94, 188, 241)',
                borderWidth: 2
              }}
              onPress={() => {
                props.parent.setSymbolsVisible(!props.visible);
              }}
              component={ TouchableOpacity }
              size={ 20 }
              reverse
              color="#fff"
              reverseColor="rgb(94, 188, 241)"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Symbols;
