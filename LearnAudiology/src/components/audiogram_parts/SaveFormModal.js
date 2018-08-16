import React from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { FormLabel,  FormInput, Button, Icon } from 'react-native-elements';
import { Header } from 'react-navigation';
import styles from '../../styles/TextStyles';

const dataModule = require('../../utils/data');
const saveGraph = dataModule.saveGraph;

class SaveFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.saveGraph = this.saveGraph.bind(this);
    this.overwrite = this.overwrite.bind(this);
  }

  state = {
    name:  this.props.parent.state.title,
    loading: false,
    buttonText: 'SAVE'
  }

  overwrite(name, points) {
    saveGraph(name, points, true);
    this.props.parent.setSaveFormVisible(!this.props.visible);
    this.props.parent.setTitle(name);
    let that = this;
    setTimeout(function () {
      that.setState({
        loading: false,
        buttonText: 'SAVE'
      })
    }, 500);
  }

  /*
   * Save graph with given title input.s
   */
  saveGraph() {
    let points = [];
    points.push(this.props.parent.state.pointsACRight);
    points.push(this.props.parent.state.pointsACLeft);
    points.push(this.props.parent.state.pointsBCRight);
    points.push(this.props.parent.state.pointsBCLeft);
    this.setState({
      loading: true,
      buttonText: ''
    })
    let that = this;
    saveGraph(this.state.name, points, false)
    .then(result => {
      if (result) {
        console.log('Saved successfully');
        this.props.parent.setSaveFormVisible(!this.props.visible);
        this.props.parent.setTitle(this.state.name);
        let that = this;
        setTimeout(function () {
          that.setState({
            loading: false,
            buttonText: 'SAVE'
          })
        }, 500);
      } else {
        Alert.alert(
          'Graph with that title already exists',
          'Would you like to overwrite?',
          [
            { text: 'No', onPress: () => console.log('Cancel Pressed') },
            { text: 'Yes', onPress: () => this.overwrite(this.state.name, points) },
          ],
          { cancelable: false }
        )
      }
    })
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={ true }
          visible={ this.props.visible }
          onRequestClose={ () => {
            this.props.parent.setSaveFormVisible(!this.props.visible);
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}
            onPress={ () => {
              this.props.parent.setSaveFormVisible(!this.props.visible);
            }}
          >
            <View>
              <View style={{
                backgroundColor: '#fff',
                width: 250,
                height: 160
              }}>
                <View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={ styles.heading }>Enter title</Text>
                  </View>
                  <FormInput
                    onChangeText={ (name) => this.setState({ name }) }
                    autoFocus
                    defaultValue={ this.props.parent.state.title }
                  />
                  <Button
                    containerViewStyle={{ marginTop: 20 }}
                    buttonStyle={{ height: 40 }}
                    title={ this.state.buttonText }
                    onPress={ this.saveGraph }
                    loading={ this.state.loading }
                    raised
                  />
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
                  this.props.parent.setSaveFormVisible(!this.props.visible);
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
  }
}

export default SaveFormModal;
