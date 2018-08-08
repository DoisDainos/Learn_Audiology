import React from 'react';
import { Text, View, Modal, TouchableHighlight, Image } from 'react-native';

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
        <TouchableHighlight
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)'
          }}
          onPress={() => {
            props.parent.setSymbolsVisible(!props.visible);
          }}
        >
          <View style={{
            backgroundColor: '#fff',
            width: '70%',
            height: 150,
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              width: '60%'
            }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>KEY</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>AC Unmasked</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>AC Masked</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>BC Unmasked</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>BC Masked</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
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
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>RIGHT</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>LEFT</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: 'https://i.imgur.com/BtWXB20.png' }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  )
}

export default Symbols;
