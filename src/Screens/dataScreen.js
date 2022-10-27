import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { Button, View, Text } from 'react-native';
import { getAcademicCalendar, resetData } from '../Actions/getDataAction';
import axios from 'axios';

const DataScreen = ({ navigation }) => {
  const { data, loading, errors } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw.style('h-full w-full bg-white')}>
      <View style={tw`m-auto bg-transparent items-center w-full text-center`}>
        {errors && Object.keys(errors).length ? (
          <Text> Error: {errors}</Text>
        ) : loading ? (
          <Text>Loading...</Text>
        ) : (
          data &&
          data.map((data) => {
            return (
              <View key={data.id}>
                <Text> ID: {data.id}</Text>
                <Text>First Name: {data.fname}</Text>
                <Text>Last Name:: {data.lname}</Text>
                <Text>Email: {data.email}</Text>
              </View>
            );
          })
        )}
        <Button onPress={onPress} title='Click' />
        <Button onPress={onReset} title='Reset' />
      </View>
    </SafeAreaView>
  );
};

export default DataScreen;
