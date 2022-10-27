import React from 'react';
import tw from 'twrnc';
import { FlatList, View } from 'react-native';
import { Text } from '@react-native-material/core';
import ago from 's-ago';

export default function StudentsMessageItem({ message }) {
  return (
    <View
      style={tw.style(
        message.reciever.indexOf('All') !== -1 ||
          message.reciever.indexOf('Students') !== -1
          ? 'w-full py-2'
          : 'hidden'
      )}
    >
      <View className='bg-blue-300 ml-3 w-2/3 p-3 rounded-xl rounded-tl-none break-words'>
        <Text style={tw.style('text-white text-base')}>{message.message}</Text>
      </View>
      <Text style={tw.style('text-gray-400 text-xs ml-6 mt-1')}>
        {ago(new Date(parseInt(message.createdAt)))}
      </Text>
    </View>
  );
}
