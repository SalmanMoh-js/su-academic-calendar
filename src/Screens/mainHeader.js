import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
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

export default function MainHeader({ unreadMessages, notifications }) {
  const [showPopover, setShowPopover] = useState(false);
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full px-3 py-2 flex flex-row justify-between shadow-md"
      )}
    >
      <Pressable style={tw.style("rounded-full")}>
        <Avatar
          image={
            <Image
              source={require("../../assets/logo.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          }
        />
      </Pressable>
      <View className="ml-4 flex flex-row">
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
          onPress={() => navigation.navigate("Student Messages")}
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
            title="Login"
            variant="text"
            color="#434040"
            leading={(props) => <Icon name="login" {...props} />}
            onPress={() => navigation.navigate("Login")}
            style={tw.style("text-left")}
          />
          <Button
            title="Request account"
            variant="text"
            color="#434040"
            leading={(props) => <Icon name="alert-circle-outline" {...props} />}
            onPress={() => navigation.navigate("New Account")}
          />
        </Popover>
      </View>
    </Surface>
  );
}
