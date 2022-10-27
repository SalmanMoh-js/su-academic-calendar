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
import {
  resetUpdate,
  resetData,
  newPassword,
  changePassword,
  resetErrors,
} from '../Actions/getDataAction';
import { toast, ToastContainer } from '@jamsch/react-native-toastify';

export default function ChangePassword() {
  const { user, loading, errors, dataUpdated } = useSelector(
    (state) => state.data
  );
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
      email: user.email,
      oldPassword,
      newPassword,
    };
    dispatch(changePassword(newLogin));
  }
  useLayoutEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors);
      if (errors.unknown) {
        toast.error('Unknown error. Please try again');
      } else if (Object.keys(errors).length && !errors.user) {
        toast.error('Unknown error. Please try again');
      }
      if (errors.password) {
        toast.error('The password you entered is incorrect');
      }
      setTimeout(() => {
        dispatch(resetErrors());
      }, 5000);
    }
    if (dataUpdated === 'password changed') {
      toast.success('Password changed');
      setNewPassword('');
      setOldPassword('');
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
          Change Password
        </Text>
      </View>
      <TextInput
        secureTextEntry={true}
        label='Old Password'
        value={oldPassword}
        onChangeText={(e) => setOldPassword(e)}
        style={tw`h-12 p-2 rounded-lg w-4/5 my-2 mb-4`}
      />
      <TextInput
        secureTextEntry={secure}
        label='New Password'
        value={newPassword}
        trailing={(props) => (
          <IconButton
            icon={(props) => <Icon name='eye' {...props} />}
            {...props}
            onPressIn={onShowPassword}
            onPressOut={onHidePassword}
          />
        )}
        onChangeText={(e) => setNewPassword(e)}
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
          !oldPassword.trim().length ||
          !newPassword.trim().length ||
          !password2.trim().length ||
          newPassword !== password2
        }
      />
      <ToastContainer position='top-center' />
    </View>
  );
}
