import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'twrnc';
import { SafeAreaView, FlatList, View, StatusBar } from 'react-native';
import {
  getMessages,
  resetErrors,
  setLastMessageCheck,
} from '../Actions/getDataAction';
import { Text } from '@react-native-material/core';
import { toast, ToastContainer } from '@jamsch/react-native-toastify';
import StudentsMessageItem from './studentsMessageItem';

const StudentsMessages = () => {
  const { user, loading, errors, messages, lastMessageCheckTime } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getMessages());
    dispatch(setLastMessageCheck(new Date().getTime()));
  }, []);
  useLayoutEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors);
      if (errors.unknown) {
        toast.error('Unknown error. Please try again');
      } else if (Object.keys(errors).length && !errors.user) {
        toast.error('Unknown error. Please try again');
      }
      setTimeout(() => {
        dispatch(resetErrors());
      }, 5000);
    }
  }, [errors]);
  return (
    <SafeAreaView style={tw.style('h-full w-full bg-white')}>
      <StatusBar animated={true} backgroundColor='#403a4aff' />
      <View style={tw.style('h-full bg-white')}>
        <View
          style={tw.style(
            'mx-auto pt-10 bg-transparent w-full items-center text-center',
            {
              height: '90%',
            }
          )}
        >
          <Text variant='h4' style={tw.style('mb-6')}>
            Messages
          </Text>
          {errors && Object.keys(errors).length ? (
            <Text> Error: {errors}</Text>
          ) : loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              style={tw.style('w-full')}
              data={messages}
              renderItem={({ item }) => <StudentsMessageItem message={item} />}
            />
          )}
        </View>
      </View>
      <ToastContainer position='top-center' />
    </SafeAreaView>
  );
};

export default StudentsMessages;
