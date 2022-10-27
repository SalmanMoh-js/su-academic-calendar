import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import {
  TextInput,
  Button,
  IconButton,
  Surface,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { resetUpdate, resetData, newPassword } from '../Actions/getDataAction';
import { toast, ToastContainer } from '@jamsch/react-native-toastify';

export default function NewPassword() {
  const { otpUser, loading, errors, dataUpdated } = useSelector(
    (state) => state.data
  );
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation();
  const onShowPassword = () => {
    setSecure(false);
  };
  const onHidePassword = () => {
    setSecure(true);
  };
  const dispatch = useDispatch();
  function onLogin() {
    const newLogin = {
      email: otpUser,
      password,
    };
    dispatch(newPassword(newLogin));
  }
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
    if (dataUpdated === 'password set') {
      toast.success('Password set. You can now login.');
      setPassword('');
      setPassword2('');
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
  }, [errors, dataUpdated]);
  return (
    <View className='pb-4 rounded-lg my-auto mx-auto w-full h-full text-center items-center flex justify-center bg-slate-200'>
      <View style={tw`rounded-lg w-full text-center p-4`}>
        <Text style={tw`font-bold text-indigo-900 text-2xl text-center`}>
          New Password
        </Text>
      </View>
      <TextInput
        secureTextEntry={secure}
        label='Password'
        value={password}
        trailing={(props) => (
          <IconButton
            icon={(props) => <Icon name='eye' {...props} />}
            {...props}
            onPressIn={onShowPassword}
            onPressOut={onHidePassword}
          />
        )}
        onChangeText={(e) => setPassword(e)}
        style={tw`h-12 p-2 rounded-lg w-4/5 my-2 mb-4`}
      />
      <TextInput
        label='Confirm Password'
        secureTextEntry={true}
        value={password2}
        onChangeText={(e) => setPassword2(e)}
        style={tw`h-12 p-2 rounded-lg w-4/5 my-4`}
      />
      <Button
        title='Submit'
        color='#584bcb'
        style={tw`rounded-lg w-64 mt-6 mb-10`}
        leading={(props) => <Icon name='login' {...props} />}
        onPress={onLogin}
        loading={loading}
        disabled={
          !password.trim().length ||
          !password2.trim().length ||
          password !== password2
        }
      />
      <Button
        variant='text'
        color='#575454'
        leading={(props) => <Icon name='login' size={23} color='#575454' />}
        title='Login'
        style={tw`rounded-lg w-64 mb-4 mx-auto`}
        onPress={() => navigation.navigate('Login')}
      />
      <ToastContainer position='top-center' />
    </View>
  );
}
