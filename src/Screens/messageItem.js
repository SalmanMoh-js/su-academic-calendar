import React from "react";
import tw from "twrnc";
import { FlatList, View } from "react-native";
import { useDispatch } from "react-redux";
import { Text, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ago from "s-ago";
import { useEffect } from "react";
import { deleteMessage } from "../Actions/getDataAction";

export default function MessageItem({ message, user, editMode, editingMode }) {
  const dispatch = useDispatch();
  return (
    <View
      style={tw.style(
        (user && message.reciever.indexOf(user.role) !== -1) ||
          user.role === "President" ||
          message.reciever.indexOf("All") !== -1 ||
          message.additionalReciever.indexOf(user.email) !== -1
          ? "w-full py-2"
          : "hidden"
      )}
    >
      <View className="w-full flex flex-row">
        <View className="bg-blue-300 ml-3 w-2/3 p-3 rounded-xl rounded-tl-none break-words">
          <Text style={tw.style("text-white text-base")}>
            {message.message}
          </Text>
        </View>
        <View className="mx-2 flex flex-row">
          {editMode ? (
            <>
              <IconButton
                icon={(props) => (
                  <Icon name="pencil" color="#657acb" size={32} />
                )}
                onPress={() => editingMode(message)}
              />
              <IconButton
                icon={(props) => (
                  <Icon name="delete" {...props} color="red" size={32} />
                )}
                style={tw.style("ml-2")}
                onPress={() => dispatch(deleteMessage(message))}
              />
            </>
          ) : null}
        </View>
      </View>
      <View className="flex flex-row">
        <Text style={tw.style("text-gray-400 text-xs ml-6 mt-1")}>
          {ago(new Date(parseInt(message.createdAt)))}
        </Text>
        <View className="p-1 bg-gray-300 ml-2 rounded-full mt-1 flex flex-row">
          <Text style={tw.style("text-gray-600 text-xs")}>
            {message.sender}
          </Text>
        </View>
      </View>
      <FlatList
        data={message.reciever}
        numColumns={3}
        keyExtractor={(item, index) => item}
        renderItem={({ item }) => (
          <View className="p-1 bg-gray-300 ml-2 rounded-full mt-1">
            <Text style={tw.style("text-gray-600 text-xs")}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}
