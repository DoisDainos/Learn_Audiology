// Define imports
import React from 'react';
import { Text, View } from 'react-native';

// Choose one of either stateless or state component:

// Stateless component: does not need to keep track of its state, lightweight
const Example = (props) => {
  return (
     <View>
        <Text>Text wrapped in view</Text>
     </View>
  );
};

// State component: can keep track of its state
class Example extends React.Component {
  constructor(props) {
    super(props);
    // Sets state to have a counter starting at 0
    this.state = { counter: 0 }
  }

  render() {
    return (
      <View>
        <Text>Text wrapped in a view</Text>
      </View>
    );
  }
}

//Define exports for use in other components
export default Example;
