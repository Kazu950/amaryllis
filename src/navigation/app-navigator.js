import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screen/home-screen';
import SearchScreen from '../screen/search-screen';
import ListScreen from '../screen/list-screen';
import AccountScreen from '../screen/account-screen';
import SignUpScreen from '../screen/signup-screen';
import SignInScreen from '../screen/signin-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const isSignedIn = useSelector((state) => state.account);
  const { login } = isSignedIn;

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      switch (route.name) {
        case 'Home':
          iconName = 'map-marker';
          break;
        case 'Search':
          iconName = 'search';
          break;
        case 'List':
          iconName = 'clock-o';
          break;
        case 'Account':
          iconName = 'user';
          break;
        default:
          iconName = '';
          break;
      }

      return <FontAwesome name={iconName} color={color} size={size} />;
    },
  });
  return (
    <NavigationContainer>
      { login ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#3385e8',
          }}
          screenOptions={screenOptions}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
          />
          <Tab.Screen
            name="List"
            component={ListScreen}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) }

    </NavigationContainer>
  );
};

export default AppNavigator;
