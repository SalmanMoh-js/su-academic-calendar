import React, { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import tw from "twrnc";
import { TextInput, Button, Surface } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { resetData, sendRequest } from "../Actions/getDataAction";
import { toast, ToastContainer } from "@jamsch/react-native-toastify";
import { List } from "react-native-paper";

export default function NewAccount() {
  const { errors, dataUpdated, addDataLoading } = useSelector(
    (state) => state.data
  );
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  function onNewAccountRequest() {
    const newAccountRequest = {
      fname: fname,
      lname: lname,
      email: email,
      role: role,
      sentAt: new Date().getTime(),
    };
    dispatch(sendRequest(newAccountRequest));
  }
  useLayoutEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors);
      if (errors.unknown) {
        toast.error("Unknown error. Please try again");
      } else if (Object.keys(errors).length && !errors.user) {
        toast.error("Unknown error. Please try again");
      }
    }
    if (dataUpdated === "request sent") {
      toast.success("New account request sent");
      setFname("");
      setLname("");
      setEmail("");
      setRole("");
      setTimeout(() => {
        dispatch(resetData());
      }, 5000);
    }
  }, [errors, dataUpdated]);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        resizeMode="cover"
        style={tw.style("flex justify-center h-full")}
      >
        <Surface
          elevation={3}
          catagory="medium"
          style={[
            tw`pb-4 rounded-lg my-auto mx-auto bg-opacity-80 w-4/5 text-center items-center border-0`,
          ]}
        >
          <View style={tw`rounded-lg w-full text-center p-4`}>
            <Text style={tw`font-bold text-indigo-900 text-lg text-center`}>
              We will email you your login credentials
            </Text>
          </View>
          <TextInput
            label="First Name"
            value={fname}
            onChangeText={(e) => setFname(e)}
            style={tw`h-12 p-2 rounded-lg w-4/5 my-2`}
          />
          <TextInput
            label="Last Name"
            value={lname}
            onChangeText={(e) => setLname(e)}
            style={tw`h-12 p-2 rounded-lg w-4/5 my-2`}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={tw`h-12 p-2 rounded-lg w-4/5 my-2`}
          />
          <View className="my-4 w-4/5">
            <List.Accordion
              title="Account Type"
              description={role ? role : "Not Selected"}
              style={tw.style("w-full bg-slate-100 text-blue-300")}
              titleStyle={tw.style("text-gray-700")}
              descriptionStyle={tw.style("text-gray-500")}
            >
              <List.Item
                title="President or Vice President"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={
                      role === "President or Vice President" ? "check" : null
                    }
                    size={24}
                  />
                )}
                onPress={() => setRole("President or Vice President")}
              />
              <List.Item
                title="President Office Director"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "President Office Director" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("President Office Director")}
              />
              <List.Item
                title="Academic Dean or Director"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "Academic Dean or Director" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("Academic Dean or Director")}
              />
              <List.Item
                title="Research and CS Director"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "Research and CS Director" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("Research and CS Director")}
              />
              <List.Item
                title="Admin Director"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "Admin Director" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("Admin Director")}
              />
              <List.Item
                title="Department Head"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "Department Head" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("Department Head")}
              />
              <List.Item
                title="Coordinator"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "Coordinator" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("Coordinator")}
              />
              <List.Item
                title="Instructor"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "Instructor" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("Instructor")}
              />
              <List.Item
                title="Admin Staff"
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
                right={(props) => (
                  <Icon
                    name={role === "Admin Staff" ? "check" : null}
                    size={24}
                  />
                )}
                onPress={() => setRole("Admin Staff")}
              />
            </List.Accordion>
          </View>
          <Button
            title="Submit"
            color="#584bcb"
            style={tw`rounded-lg w-64 mt-6 mb-10`}
            leading={(props) => <Icon name="send" {...props} />}
            onPress={onNewAccountRequest}
            loading={addDataLoading}
            disabled={
              !email.trim().length ||
              !fname.trim().length ||
              !lname.trim().length ||
              !role.trim().length ||
              addDataLoading
            }
          />
        </Surface>
        <ToastContainer position="top-center" duration={3000} />
      </ImageBackground>
    </SafeAreaView>
  );
}
