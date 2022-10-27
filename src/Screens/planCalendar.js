import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import {
  SafeAreaView,
  FlatList,
  View,
  StatusBar,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  LogBox,
} from "react-native";
import {
  getPlanCalendar,
  resetData,
  resetErrors,
  resetUpdate,
  updatePlanCalendar,
} from "../Actions/getDataAction";
import { List } from "react-native-paper";
import {
  Text,
  Badge,
  Surface,
  AppBar,
  TextInput,
  IconButton,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import { toast, ToastContainer } from "@jamsch/react-native-toastify";

const Plan = ({ navigation }) => {
  const { planCalendar, loading, errors, dataUpdated, user, addDataLoading } =
    useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState({
    title: "",
    id: "",
    start_date: "",
    end_date: "",
  });
  const [startDateShow, setStartDateShow] = useState(false);
  const [endDateShow, setEndDateShow] = useState(false);
  const Today = new Date().getDay() + new Date().getMonth();
  function isInTheFuture(date) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date > today;
  }
  const daysLeft = (start_date) => {
    const today = new Date();
    const givenDate = new Date(start_date);
    let difference = givenDate.getTime() - today.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };
  const [futureDates, setFutureDates] = useState(
    planCalendar.filter((date) => isInTheFuture(new Date(date.start_date)))
  );
  const [futureDatesId, setFutureDatesId] = useState(
    futureDates.map((date) => date.id)
  );
  function onSelect(item) {
    setStartDate(new Date(item.start_date));
    setEndDate(new Date(item.end_date));
    setSelectedDate({
      ...selectedDate,
      title: item.title,
      id: item.id,
      start_date: item.start_date,
      end_date: item.end_date,
    });
    setModalVisible(true);
  }
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }
  function onUpdate() {
    dispatch(updatePlanCalendar(selectedDate));
  }
  useEffect(() => {
    setFutureDates(
      planCalendar.filter((date) => isInTheFuture(new Date(date.start_date)))
    );
    setFutureDatesId(futureDates.map((date) => date.id));
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
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
    if (dataUpdated === "date updated") {
      toast.success("Date updated successfull");
      setModalVisible(false);
      dispatch(getPlanCalendar());
      setFutureDates(
        planCalendar.filter((date) => isInTheFuture(new Date(date.start_date)))
      );
      setFutureDatesId(futureDates.map((date) => date.id));
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
  }, [errors, dataUpdated]);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <View style={tw.style("flex justify-center h-full bg-slate-200")}>
        <View
          style={tw`mx-auto py-10 bg-transparent items-center w-full text-center h-full`}
        >
          <Text variant="h4" style={tw.style("mb-6")}>
            Plan Calendar
          </Text>
          {errors && Object.keys(errors).length ? null : loading ? (
            <ActivityIndicator size="large" color="#4184e1" />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    dispatch(getPlanCalendar());
                    setFutureDates(
                      planCalendar.filter((date) =>
                        isInTheFuture(new Date(date.start_date))
                      )
                    );
                    setFutureDatesId(futureDates.map((date) => date.id));
                  }}
                />
              }
              className="w-full h-full flex"
            >
              {planCalendar.map((item) => {
                return (
                  <List.Accordion
                    key={item.id}
                    title={item.title}
                    right={(props) => (
                      <View className="flex flex-row">
                        {futureDatesId.indexOf(item.id) === -1 ? null : (
                          <Badge
                            label={
                              daysLeft(item.start_date) > 1
                                ? `${daysLeft(item.start_date)} days left`
                                : daysLeft(item.start_date) === 1
                                ? "Tomorrow"
                                : "Today"
                            }
                            color="primary"
                          />
                        )}
                        <Badge
                          label={
                            futureDatesId.indexOf(item.id) === -1
                              ? "Passed"
                              : "Upcoming"
                          }
                          color="secondary"
                        />
                      </View>
                    )}
                    description={item.description}
                    style={tw.style("w-full bg-slate-100 text-blue-300")}
                    titleStyle={tw.style("text-gray-700")}
                    descriptionStyle={tw.style("text-gray-500")}
                  >
                    <List.Item
                      title="Start Date"
                      description={item.start_date}
                      style={tw.style("bg-slate-200 text-blue-300")}
                      titleStyle={tw.style("text-gray-700")}
                      descriptionStyle={tw.style("text-gray-500")}
                      right={(props) => (
                        <>
                          {user && user.additionalPrivilage === 3 ? (
                            <Button
                              variant="outline"
                              title="Update"
                              loading={addDataLoading}
                              onPress={() => onSelect(item)}
                            />
                          ) : null}
                        </>
                      )}
                    />
                    <List.Item
                      title="End Date"
                      description={item.end_date}
                      style={tw.style("bg-slate-200 text-blue-300")}
                      titleStyle={tw.style("text-gray-700")}
                      descriptionStyle={tw.style("text-gray-500")}
                    />
                  </List.Accordion>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        backdropOpacity={0.5}
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
      >
        <Surface style={tw`mx-auto mt-10 w-90 rounded-3xl bg-gray-300 pb-4`}>
          <AppBar
            tintColor="white"
            style={tw`mb-2 bg-blue-400 rounded-t-3xl text-white`}
            title={`Update ${selectedDate.title}`}
            trailing={(props) => (
              <IconButton
                icon={(props) => <Icon name="close" {...props} />}
                {...props}
                onPress={() => setModalVisible(!modalVisible)}
              />
            )}
          />
          <View className="flex flex-row w-full px-2">
            <TextInput
              label="Start Date"
              value={selectedDate.start_date}
              editable={false}
              trailing={(props) => (
                <IconButton
                  icon={(props) => <Icon name="calendar" {...props} />}
                  {...props}
                  onPress={() => {
                    setEndDateShow(false);
                    setStartDateShow(true);
                  }}
                />
              )}
              style={tw`h-12 w-full my-2`}
            />
          </View>
          <View className="flex flex-row w-full px-2">
            <TextInput
              label="End Date"
              value={selectedDate.end_date}
              editable={false}
              trailing={(props) => (
                <IconButton
                  icon={(props) => <Icon name="calendar" {...props} />}
                  {...props}
                  onPress={() => {
                    setEndDateShow(true);
                    setStartDateShow(false);
                  }}
                />
              )}
              style={tw`h-12 w-full my-2`}
            />
          </View>
          <View className="flex flex-row w-full px-2 py-2 justify-center">
            <Button
              title="Update"
              leading={(props) => <Icon name="check" {...props} />}
              style={tw`w-full`}
              onPress={onUpdate}
              loading={addDataLoading}
            />
          </View>
        </Surface>
        <DateTimePickerModal
          testID="dateTimePicker"
          isVisible={startDateShow}
          mode="date"
          date={startDate}
          onChange={(date) => {
            setSelectedDate({
              ...selectedDate,
              start_date: formatDate(date),
            });
          }}
          onConfirm={(date) => {
            setSelectedDate({
              ...selectedDate,
              start_date: formatDate(date),
            });
            setStartDateShow(false);
          }}
          onCancel={() => {
            setStartDateShow(false);
          }}
        />
        <DateTimePickerModal
          testID="dateTimePicker"
          isVisible={endDateShow}
          mode="date"
          date={endDate}
          onChange={(date) => {
            setSelectedDate({
              ...selectedDate,
              end_date: formatDate(date),
            });
          }}
          onConfirm={(date) => {
            setSelectedDate({
              ...selectedDate,
              end_date: formatDate(date),
            });
            setEndDateShow(false);
          }}
          onCancel={() => {
            setEndDateShow(false);
          }}
        />
      </Modal>
      <ToastContainer position="top-center" />
    </SafeAreaView>
  );
};

export default Plan;
