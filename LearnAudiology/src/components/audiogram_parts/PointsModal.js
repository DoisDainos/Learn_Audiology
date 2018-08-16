import React from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity
} from 'react-native';
import { Badge, Icon, Button, Divider } from 'react-native-elements';

class PointsModal extends React.Component {
  state = {
    points: []
  }

  constructor(props) {
    super(props);
  }

  setPoints(points) {
    this.setState({
      points: points
    })
  }

  render() {
    var index = 0;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={ true }
          visible={ this.props.visible }
          onRequestClose={ () => {
            this.props.parent.setPointsVisible(!this.props.visible);
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}
            onPress={() => {
              this.props.parent.setPointsVisible(!this.props.visible);
            }}
          >
            <View>
              <View>
              </View>
                <View style={{
                  backgroundColor: '#fff',
                  width: '80%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {this.props.points.length > 0 &&
                    <Text style={{ padding: 5 }}>
                      Points at frequency: { this.props.points[0].Hz }Hz
                    </Text>
                  }
                  {
                    this.props.points.map((point) => (
                      <View key={ index++ } >
                        <View style={{
                          flexDirection: 'row',
                          padding: 5
                        }}>
                          <Image
                            style={{ width: 20, height: 20, alignSelf: 'center' }}
                            source={{ uri: point.image }}
                          />
                          <Text style={{ marginLeft: 20, alignSelf: 'center' }}>
                            Hearing level: { point.dB }dB
                          </Text>
                          <Button
                            raised
                            icon={{name: 'timeline'}}
                            title="EDIT"
                            backgroundColor="rgb(94, 188, 241)"
                            onPress={ () => this.props.parent.editPress(point) }
                          />
                        </View>
                        {this.props.points.length > 1 &&
                          index != this.props.points.length &&
                          <Divider />
                        }
                      </View>
                    ))
                  }
                </View>
                <Icon
                  name="close"
                  containerStyle={{
                    position: 'absolute',
                    top: -30,
                    right: -30,
                    borderColor: 'rgb(94, 188, 241)',
                    borderWidth: 2
                  }}
                  onPress={() => {
                    this.props.parent.setPointsVisible(!this.props.visible);
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

export default PointsModal;
