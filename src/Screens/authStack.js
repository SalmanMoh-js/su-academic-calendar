import React from 'react';
import { Easing } from 'react-native';
import 'react-native-gesture-handler';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import MainScreen from './mainScreen';
import Academic from './academicCalendar';
import Plan from './planCalendar';
import Budget from './budgetCalendar';
import LoginScreen from './loginScreen';
import NewAccount from './newAccount';
import Messages from './messages';
import NotificationsScreen from './notifications';
import { IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { clearNotifications } from '../Actions/getDataAction';
import SecondMainScreen from './secondMainScreen';
import StudentsMessages from './studentsMessages';
import OtpLogin from './otpLogin';
import NewPassword from './newPassword';
import ChangePassword from './changePassword';
import ForgotPassword from './forgotPassword';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};
export default function AuthStack({ navigation }) {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name='Main'
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Home'
        component={SecondMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Academic'
        component={Academic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Budget'
        component={Budget}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Plan'
        component={Plan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Messages'
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Student Messages'
        component={StudentsMessages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon={(props) => <Icon name='trash-can-outline' {...props} />}
              onPress={() => dispatch(clearNotifications())}
            />
          ),
        }}
      />
      <Stack.Screen
        name='New Account'
        component={NewAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Change Password'
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Forgot Password'
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='New Password'
        component={NewPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='OTP Login'
        component={OtpLogin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
