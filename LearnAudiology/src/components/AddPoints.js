import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ButtonGroup, Button, Icon } from 'react-native-elements';
import styles from '../styles/TextStyles';

class AddPoints extends React.Component {
  static navigationOptions = {
    title: 'Add points',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgb(94, 188, 241)',
    }
  }

  state = {
    selectedIndexEar: 2,
    selectedIndexCon: 2,
    frequency: 125,
    hearingLevel: 0
  };

  constructor(props) {
    super()
    this.updateIndexEar = this.updateIndexEar.bind(this);
    this.updateIndexCon = this.updateIndexCon.bind(this);
    this.increaseFreq = this.increaseFreq.bind(this);
    this.decreaseFreq = this.decreaseFreq.bind(this);
    this.increaseHear = this.increaseHear.bind(this);
    this.decreaseHear = this.decreaseHear.bind(this);
  }

  /*
   * Change index of button for ear choice button group.
   */
  updateIndexEar(selectedIndexEar) {
    this.setState({
      selectedIndexEar
    });
  }

  /*
   * Change index of button for conduction type button group.
   */
  updateIndexCon(selectedIndexCon) {
    this.setState({
      selectedIndexCon
    });
  }

  /*
   * Increase frequency input.
   */
  increaseFreq() {
    let newFreq = 0;
    if (this.state.frequency < 8000) {
        newFreq = this.state.frequency * 2;
    } else {
        newFreq = 8000;
    }
    this.setState({ frequency: newFreq });
  }

  /*
   * Decrease frequency input.
   */
  decreaseFreq() {
    let newFreq = 0;
    if (this.state.frequency > 125) {
        newFreq = this.state.frequency - this.state.frequency / 2;
    } else {
        newFreq = 125;
    }
    this.setState({ frequency: newFreq });
  }

  /*
   * Increase hearing level input.
   */
  increaseHear() {
    let newHear = this.state.hearingLevel + 5;
    if (newHear <= 120) {
      this.setState({ hearingLevel: newHear });
    }
  }

  /*
   * Decrease hearing level input.
   */
  decreaseHear() {
    let newHear = this.state.hearingLevel - 5;
    if (newHear >= -10) {
      this.setState({ hearingLevel: newHear });
    }
  }

  render() {
    // Selector for ear choice
    const buttonsEar = [ 'Right', 'Left' ];
    const { selectedIndexEar } = this.state;

    // Selector for conduction choice
    const buttonsConduction = [ 'Air', 'Bone' ];
    const { selectedIndexCon } = this.state;

    return (
      <ScrollView>
        <Text style={ styles.heading }>Test ear</Text>
        <ButtonGroup
          onPress={ this.updateIndexEar }
          selectedIndex={ selectedIndexEar }
          buttons={ buttonsEar }
          containerStyle={{ height: '12.5%' }}
          selectedTextStyle={{ fontWeight: 'bold' }}
          textStyle={{ fontSize: 23 }}
        />
        <Text style={ styles.heading }>Conduction</Text>
        <ButtonGroup
          onPress={ this.updateIndexCon }
          selectedIndex={ selectedIndexCon }
          buttons={ buttonsConduction }
          containerStyle={{ height: '12.5%' }}
          selectedTextStyle={{ fontWeight: 'bold' }}
          textStyle={{ fontSize: 23 }}
        />
        <Text style={ styles.heading }>Frequency</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              size={ 35 }
              name="remove"
              color="rgb(140, 140, 140)"
              reverse
              reverseColor="#fff"
              onPress={ this.decreaseFreq }
              component={ TouchableOpacity }
            />
            <View style={{ width: 125, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 28,
                  alignSelf: 'center',
                  color: 'rgb(60, 60, 60)'
                }}
              >
                { this.state.frequency }Hz
              </Text>
            </View>
            <Icon
              size={ 35 }
              name="add"
              color="rgb(140, 140, 140)"
              reverse
              reverseColor="#fff"
              onPress={ this.increaseFreq }
              component={ TouchableOpacity }
            />
          </View>
        </View>
        <Text style={ styles.heading }>Hearing level</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              size={ 35 }
              name="remove"
              color="rgb(140, 140, 140)"
              reverse
              reverseColor="#fff"
              onPress={ this.decreaseHear }
              component={ TouchableOpacity }
            />
            <View style={{ width: 125, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 28,
                  alignSelf: 'center',
                  color: 'rgb(60, 60, 60)'
                }}
              >
                { this.state.hearingLevel }dB
              </Text>
            </View>
            <Icon
              size={ 35 }
              name="add"
              color="rgb(140, 140, 140)"
              reverse
              reverseColor="#fff"
              onPress={ this.increaseHear }
              component={ TouchableOpacity }
            />
          </View>
        </View>
        <View style={{ height: 130, marginTop: 15 }}>
          <Button
            raised
            title="SUBMIT"
            backgroundColor="rgb(94, 188, 241)"
          />
        </View>
      </ScrollView>
    );
  }
}

export default AddPoints;
