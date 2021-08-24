import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './screens/Home';
import Details from './screens/Details';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#cdcdcd',
          tabBarLabelStyle: {
            textAlign: 'center',
            color: 'white',
          },
          tabBarIndicatorStyle: {
            borderBottomColor: 'green',
            borderBottomWidth: 2,
          },
          tabBarStyle: {
            backgroundColor: 'purple',
            borderRadius: 10,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={({navigation, route}) => ({
            title: 'QR Code Generator',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
        <Tab.Screen
          name="Details"
          component={Details}
          options={({navigation, route}) => ({
            title: 'Bar Code Generator',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
