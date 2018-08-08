import StackNavigator from 'react-navigation';
import React from 'react';
import {
  Home, Audiogram
} from './';


_toAudiogram = () => {
  this.props.navigation.navigate('Audiogram');
};

export const navigate = this.props.navigation;
export const RootNavigator = StackNavigator ({
  Home: {screen: Home},
  Audiogram: {screen: Audiogram}
});
