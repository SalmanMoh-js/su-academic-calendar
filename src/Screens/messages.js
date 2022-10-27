import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import {
  SafeAreaView,
  FlatList,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  Text,
} from "react-native";
import {
  getAccounts,
  resetErrors,
  sendMessage,
  setLastMessageCheck,
  updateMessage,
} from "../Actions/getDataAction";
import {
  Button,
  Chip,
  IconButton,
  Pressable,
  Surface,
  TextInput,
} from "@react-native-material/core";
import MessageItem from "./messageItem";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { toast, ToastContainer } from "@jamsch/react-native-toastify";
import Modal from "react-native-modal";
import { List } from "react-native-paper";
import CustomMultiPicker from "react-native-multiple-select-list";
import { useRef } from "react";

const Messages = () => {
  const { user, loading, errors, messages, accounts } = useSelector(
    (state) => state.data
  );
  const multiSelect = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editing, setEditing] = useState(false);
  const [additionalModalVisible, setAdditionalModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState();
  const [additionalReciever, setAdditionalReciever] = useState([]);

  const [recievers, setReciever] = useState(["All"]);
  const dispatch = useDispatch();
  function onMessageSend() {
    const newMessage = {
      message,
      createdAt: new Date().getTime(),
      sender: `${user.fname} ${user.lname}`,
      reciever: String(recievers),
      additionalReciever: String(additionalReciever),
    };
    dispatch(sendMessage(newMessage));
    setMessage("");
  }
  function onMessageUpdate() {
    const newMessage = {
      message,
      id: selectedMessage.id,
    };
    dispatch(updateMessage(newMessage));
    setMessage("");
    setEditing(false);
  }
  function editingMode(message) {
    setMessage(message.message);
    setSelectedMessage(message);
    setEditing(true);
  }
  function onChangeAdditionalRecievers(res) {
    let data = res.filter(function (element) {
      return element !== undefined;
    });
    setAdditionalReciever(data);
  }
  function onChangeRecievers(item) {
    if (recievers.indexOf(item) !== -1) {
      let newArr = recievers;
      newArr = newArr.filter((value) => value !== item);
      setReciever(newArr);
    } else {
      let newArr = recievers;
      newArr = newArr.concat(item);
      setReciever(newArr);
    }
  }
  useLayoutEffect(() => {
    dispatch(setLastMessageCheck(new Date().getTime()));
    dispatch(getAccounts());
  }, []);
  useLayoutEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors);
      if (errors.unknown) {
        toast.error("Unknown error. Please try again");
      } else if (Object.keys(errors).length && !errors.user) {
        toast.error("Unknown error. Please try again");
      }
      setTimeout(() => {
        dispatch(resetErrors());
      }, 5000);
    }
  }, [errors]);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <View style={tw.style("h-full bg-slate-200")}>
        <View
          style={tw.style(
            "mx-auto pt-10 bg-transparent w-full items-center text-center",
            {
              height: "90%",
            }
          )}
        >
          <View className="w-full flex flex-row justify-between pl-4 py-3">
            <Text style={tw.style("mb-6 text-xl font-bold")}>Messages</Text>
            {user.role === "President" ? (
              <>
                {editMode ? (
                  <IconButton
                    icon={(props) => (
                      <Icon name="close" color="#657acb" size={32} />
                    )}
                    style={tw.style("mx-2")}
                    onPress={() => setEditMode(false)}
                  />
                ) : (
                  <IconButton
                    icon={(props) => (
                      <Icon name="pencil" color="#657acb" size={32} />
                    )}
                    style={tw.style("mx-2")}
                    onPress={() => setEditMode(true)}
                  />
                )}
              </>
            ) : null}
          </View>
          {errors && Object.keys(errors).length ? (
            <Text> Error: {errors}</Text>
          ) : loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {user.role === "President" ? (
                <Pressable
                  style={tw.style("w-full")}
                  onPress={() => setModalVisible(true)}
                >
                  <View className="w-full px-1 pt-2 pb-3 flex flex-row bg-slate-100 justify-start">
                    <Text className="font-bold text-lg text-gray-600 mr-2 my-auto">
                      To:{" "}
                    </Text>
                    <FlatList
                      style={tw.style("w-full")}
                      data={recievers}
                      numColumns={2}
                      keyExtractor={(item, index) => item}
                      renderItem={({ item }) => (
                        <Chip
                          label={item}
                          onPress={() => setModalVisible(true)}
                          style={tw.style("my-auto mt-1")}
                        />
                      )}
                    />
                    <IconButton
                      icon={(props) => (
                        <Icon name="plus" color="#657acb" size={32} />
                      )}
                      style={tw.style("mx-2")}
                      onPress={() => setAdditionalModalVisible(true)}
                    />
                  </View>
                </Pressable>
              ) : null}
              <FlatList
                style={tw.style("w-full")}
                data={messages}
                renderItem={({ item }) => (
                  <MessageItem
                    message={item}
                    user={user}
                    editMode={editMode}
                    editingMode={editingMode}
                  />
                )}
              />
            </>
          )}
        </View>
        {user.role === "President" ? (
          <View className="absolute bottom-0 w-full px-1 pt-2 pb-3 flex flex-row bg-slate-100 justify-between">
            <TextInput
              label={editing ? "Edit Message" : "Message"}
              multiline
              value={message}
              onChangeText={(e) => setMessage(e)}
              style={tw`h-12 p-2 rounded-lg w-10/12 rounded-full`}
              inputStyle={tw`rounded-xl`}
            />
            <View className="mt-3">
              <IconButton
                icon={(props) => (
                  <Icon
                    name="send"
                    color={
                      !message.trim().length || !recievers.length
                        ? "#bebaba"
                        : "#657acb"
                    }
                    size={32}
                  />
                )}
                onPress={editing ? onMessageUpdate : onMessageSend}
                style={tw.style("mx-2")}
                disabled={!message.trim().length || !recievers.length}
              />
            </View>
          </View>
        ) : null}
      </View>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        transparent={true}
        isVisible={additionalModalVisible}
        hasBackdrop
        backdropOpacity={0.08}
        onBackdropPress={() => {
          setAdditionalModalVisible(!additionalModalVisible);
        }}
        onRequestClose={() => {
          setAdditionalModalVisible(!additionalModalVisible);
        }}
        onBackButtonPress={() => {
          setAdditionalModalVisible(!additionalModalVisible);
        }}
      >
        <Surface style={tw`flex rounded-lg p-2 mb-16`}>
          <CustomMultiPicker
            options={accounts.reduce((a, v) => ({ ...a, [v]: v }), {})}
            search={true} // should show search bar?
            multiple={true} //
            placeholder={"Search"}
            placeholderTextColor={"#757575"}
            callback={(res) => {
              onChangeAdditionalRecievers(res);
            }}
            rowBackgroundColor={"#eee"}
            returnValue="value"
            rowHeight={40}
            rowRadius={5}
            iconColor={"#00a2dd"}
            iconSize={24}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            scrollViewHeight={300}
          />
        </Surface>
      </Modal>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        transparent={true}
        isVisible={modalVisible}
        hasBackdrop
        backdropOpacity={0.08}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
        onSwipeComplete={() => {
          setModalVisible(!modalVisible);
        }}
        swipeDirection={["down", "up", "left", "right"]}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onBackButtonPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Surface style={tw`mx-auto w-4/5 rounded-3xl`}>
          <List.Item
            title="All"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={recievers.indexOf("All") !== -1 ? "check" : ""}
              />
            )}
            onPress={() => onChangeRecievers("All")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
          />
          <List.Item
            title="Presidents"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={recievers.indexOf("Presidents") !== -1 ? "check" : ""}
              />
            )}
            onPress={() => onChangeRecievers("Presidents")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="President Office Directors"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={
                  recievers.indexOf("President Office Directors") !== -1
                    ? "check"
                    : ""
                }
              />
            )}
            onPress={() => onChangeRecievers("President Office Directors")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Academic Deans or Directors"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={
                  recievers.indexOf("Academic Deans or Directors") !== -1
                    ? "check"
                    : ""
                }
              />
            )}
            onPress={() => onChangeRecievers("Academic Deans or Directors")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Research and CS Directors"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={
                  recievers.indexOf("Research and CS Directors") !== -1
                    ? "check"
                    : ""
                }
              />
            )}
            onPress={() => onChangeRecievers("Research and CS Directors")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Admin Directors"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={
                  recievers.indexOf("Admin Directors") !== -1 ? "check" : ""
                }
              />
            )}
            onPress={() => onChangeRecievers("Admin Directors")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Department Heads"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={
                  recievers.indexOf("Department Heads") !== -1 ? "check" : ""
                }
              />
            )}
            onPress={() => onChangeRecievers("Department Heads")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Coordinators"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={recievers.indexOf("Coordinators") !== -1 ? "check" : ""}
              />
            )}
            onPress={() => onChangeRecievers("Coordinators")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Admin Staffs"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={recievers.indexOf("Admin Staffs") !== -1 ? "check" : ""}
              />
            )}
            onPress={() => onChangeRecievers("Admin Staffs")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Instructors"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={recievers.indexOf("Teachers") !== -1 ? "check" : ""}
              />
            )}
            onPress={() => onChangeRecievers("Teachers")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full border-b border-gray-600 p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
          <List.Item
            title="Students"
            left={(props) => (
              <List.Icon
                color="#474646"
                icon={recievers.indexOf("Students") !== -1 ? "check" : ""}
              />
            )}
            onPress={() => onChangeRecievers("Students")}
            titleStyle={tw.style("text-gray-600 text-lg font-bold")}
            style={tw.style("w-full p-0")}
            disabled={recievers.indexOf("All") !== -1}
          />
        </Surface>
      </Modal>
      <ToastContainer position="top-center" />
    </SafeAreaView>
  );
};

export default Messages;
