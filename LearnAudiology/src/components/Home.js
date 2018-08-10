import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import styles from '../styles/TextStyles';

class Home extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={ styles.heading }>Press a Button</Text>
        <Button onPress={() => navigate('Graph')} title='Audiogram'/>
        <Button color="red" onPress={() => {console.log('Working')}, () => navigate('Test')} title='Saved Graphs'/>
        <Button onPress={() => navigate('Test')} title='Test Yourself'/>
        <Button onPress={() => navigate('Test')} title='Settings'/>
        <TouchableOpacity
           style={{
               borderWidth:0,
               borderColor:'rgba(0,0,0,0.2)',
               alignItems:'center',
               justifyContent:'center',
               alignSelf: 'center',
               width: '90%',
               height: 100,
               backgroundColor:'rgb(94, 188, 241)',
               borderRadius:50,
           }}
         ><Text>Audiograms</Text>
         </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
