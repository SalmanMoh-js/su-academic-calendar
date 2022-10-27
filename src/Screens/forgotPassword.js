import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import tw from 'twrnc';
import {
  TextInput,
  Button,
  IconButton,
  Surface,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  setUser,
  resetData,
  userLogin,
  resetUpdate,
  resetPasswordRequest,
} from '../Actions/getDataAction';
import { toast } from '@jamsch/react-native-toastify';
import { useLayoutEffect } from 'react';

export default function ForgotPassword({ navigation }) {
  const { user, loading, dataUpdated, errors } = useSelector(
    (state) => state.data
  );
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  function onLogin() {
    const newReset = {
      email,
      sentAt: new Date().getTime(),
    };
    dispatch(resetPasswordRequest(newReset));
  }
  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [user]);
  useLayoutEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors);
      if (errors.unknown) {
        toast.error('Unknown error. Please try again');
      } else if (Object.keys(errors).length && !errors.user) {
        toast.error('Unknown error. Please try again');
      }
      if (errors.user) {
        toast.error('Invalid email or OTP');
      }
      setTimeout(() => {
        dispatch(resetData());
      }, 5000);
    }
    if (dataUpdated === 'password reset') {
      toast.success('Password reset request sent.');
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
  }, [errors, dataUpdated]);
  return (
    <SafeAreaView style={tw.style('h-full w-full bg-white')}>
      <StatusBar animated={true} backgroundColor='#403a4aff' />
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        resizeMode='cover'
        style={tw.style('flex justify-center h-full')}
      >
        <Surface
          elevation={3}
          catagory='medium'
          style={[
            tw`pb-4 rounded-lg my-auto mx-auto bg-opacity-80 w-4/5 text-center items-center border-0`,
          ]}
        >
          <View style={tw`rounded-lg w-full text-center p-4`}>
            <Text style={tw`font-bold text-indigo-900 text-2xl text-center`}>
              Password reset request
            </Text>
          </View>
          <TextInput
            label='Email'
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={tw`h-12 p-2 rounded-lg w-4/5 my-2`}
          />
          <Button
            title='Submit'
            color='#7268ce'
            style={tw`rounded-lg w-64 mt-6 mb-10`}
            leading={(props) => <Icon name='check' {...props} />}
            onPress={onLogin}
            loading={loading}
            disabled={!email.trim().length}
          />
        </Surface>
        <Button
          variant='text'
          color='#575454'
          leading={(props) => <Icon name='login' size={23} color='#575454' />}
          title='Login'
          style={tw`rounded-lg w-64 mx-auto`}
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          variant='text'
          color='#575454'
          leading={(props) => (
            <Icon name='alert-circle-outline' size={23} color='#575454' />
          )}
          title='Request account'
          style={tw`rounded-lg w-64 mt-5 mb-10 mx-auto`}
          onPress={() => navigation.navigate('New Account')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
