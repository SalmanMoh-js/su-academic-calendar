import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Pressable,
  Surface,
} from "@react-native-material/core";
import tw from "twrnc";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Popover, { PopoverPlacement, Rect } from "react-native-popover-view";

export default function SecondHeader({
  user,
  backAction,
  notifications,
  unreadMessages,
}) {
  const [showPopover, setShowPopover] = useState(false);
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full px-3 py-2 flex flex-row justify-between shadow-md"
      )}
    >
      {user ? (
        <>
          <View className="flex flex-row">
            <Pressable style={tw.style("rounded-full")}>
              <Avatar label={`${user.fname} ${user.lname}`} />
            </Pressable>
            <View className="flex flex-col">
              <Text className="text-lg font-bold text-gray-600 my-auto ml-3 break-words">
                {user.fname} {user.lname}
              </Text>
              <Text className="text-sm font-light text-gray-600 my-auto ml-3">
                {user.email}
              </Text>
            </View>
          </View>
          <View className="ml-4 flex flex-row">
            {/* <Text className='text-lg font-light text-gray-600'>
              {user.email}
            </Text> */}
            <IconButton
              icon={(props) => (
                <Icon
                  name={
                    unreadMessages.length
                      ? "message-badge-outline"
                      : "message-outline"
                  }
                  {...props}
                />
              )}
              onPress={() => navigation.navigate("Messages")}
            />
            <IconButton
              icon={(props) => (
                <Icon
                  name={
                    notifications.length ? "bell-badge-outline" : "bell-outline"
                  }
                  {...props}
                />
              )}
              onPress={() => navigation.navigate("Notifications")}
            />
            <Popover
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}
              from={
                <TouchableOpacity onPress={() => setShowPopover(true)}>
                  <IconButton
                    icon={(props) => <Icon name="cog-outline" {...props} />}
                    disabled
                  />
                </TouchableOpacity>
              }
              backgroundStyle={{ opacity: 0.1 }}
              popoverStyle={tw.style("bg-white shadow-lg p-3")}
            >
              <Button
                title="logout"
                variant="text"
                color="#e05656"
                leading={(props) => <Icon name="logout" {...props} />}
                onPress={backAction}
                style={tw.style("text-left")}
              />
              <Button
                title="change password"
                variant="text"
                color="#434040"
                leading={(props) => <Icon name="lock-outline" {...props} />}
                onPress={() => navigation.navigate("Change Password")}
              />
            </Popover>
          </View>
        </>
      ) : null}
    </Surface>
  );
}
