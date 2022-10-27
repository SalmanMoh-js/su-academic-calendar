import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  Alert,
  BackHandler,
  ImageBackground,
  View,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import tw from "twrnc";
import { Surface, Button, Badge, Pressable } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../../Style";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  resetData,
  getAcademicCalendar,
  getBudgetCalendar,
  getPlanCalendar,
  getMessages,
  setNotif,
  resetErrors,
} from "../Actions/getDataAction";
import { toast, ToastContainer } from "@jamsch/react-native-toastify";
import SecondHeader from "./secondHeader";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const SecondMainScreen = ({ navigation }) => {
  const {
    user,
    academicCalendar,
    budgetCalendar,
    planCalendar,
    messages,
    lastMessageCheckTime,
    errors,
    notifications,
  } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const notificationRef = useRef(false);
  const notificationDismisser = useRef();
  const newDate = new Date();
  const Today = newDate.toISOString().split("T")[0];
  let afterThreeDays = new Date(Today);
  let afterTwoDays = new Date(Today);
  let tomorrow = new Date(Today);
  let today = new Date(Today);
  afterThreeDays.setDate(afterThreeDays.getDate() + 3);
  afterTwoDays.setDate(afterTwoDays.getDate() + 2);
  tomorrow.setDate(tomorrow.getDate() + 1);
  afterThreeDays = afterThreeDays.toISOString().split("T")[0];
  afterTwoDays = afterTwoDays.toISOString().split("T")[0];
  tomorrow = tomorrow.toISOString().split("T")[0];
  today = today.toISOString().split("T")[0];
  const [unreadMessages, setUnreadMessages] = useState(
    messages.filter(
      (message) => parseInt(message.createdAt) > parseInt(lastMessageCheckTime)
    )
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.navigate("Notifications");
        Notifications.dismissAllNotificationsAsync();
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      responseListener.current.remove();
    };
  }, []);

  const backAction = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          dispatch(resetData());
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate("Main");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  }, [user]);
  const showNotif = async (calendar) => {
    let notif = calendar;
    notif.map((notify) => {
      notify.timeStamp = new Date();
    });
    await notif.map((cal) => {
      const isFound = notifications.some((element) => {
        if (element.id === cal.id) {
          return true;
        }
        return false;
      });
      if (!isFound) {
        dispatch(setNotif(calendar));
        schedulePushNotification(
          cal,
          today,
          tomorrow,
          afterTwoDays,
          notifications
        );
      }
    });
  };
  useEffect(() => {
    if (academicCalendar.length) {
      let in3days = academicCalendar.filter(
        (calendar) =>
          calendar.start_date === afterThreeDays ||
          calendar.start_date === afterTwoDays ||
          calendar.start_date === tomorrow ||
          calendar.start_date === today
      );
      if (in3days.length) {
        showNotif(in3days);
      }
    }
  }, [academicCalendar]);

  useEffect(() => {
    if (budgetCalendar.length) {
      let in3days = budgetCalendar.filter(
        (calendar) =>
          calendar.start_date === afterThreeDays ||
          calendar.start_date === afterTwoDays ||
          calendar.start_date === tomorrow ||
          calendar.start_date === today
      );
      if (in3days.length) {
        showNotif(in3days);
      }
    }
  }, [budgetCalendar]);
  useEffect(() => {
    if (planCalendar.length) {
      let in3days = planCalendar.filter(
        (calendar) =>
          calendar.start_date === afterThreeDays ||
          calendar.start_date === afterTwoDays ||
          calendar.start_date === tomorrow ||
          calendar.start_date === today
      );
      if (in3days.length) {
        showNotif(in3days);
      }
    }
  }, [planCalendar]);
  useLayoutEffect(() => {
    dispatch(getAcademicCalendar());
    dispatch(getBudgetCalendar());
    dispatch(getPlanCalendar());
    dispatch(getMessages());
    setUnreadMessages(
      messages.filter(
        (message) =>
          parseInt(message.createdAt) > parseInt(lastMessageCheckTime)
      )
    );
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
      <SecondHeader
        user={user}
        backAction={backAction}
        notifications={notifications}
        unreadMessages={unreadMessages}
      />
      <Surface
        style={tw`m-auto bg-transparent items-center w-full text-center`}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Academic");
          }}
          style={tw.style(
            "flex-col p-3 border border-gray-400 rounded-3xl w-1/3 text-center items-center justify-center mt-4"
          )}
        >
          <Icon
            name="calendar"
            color="#424141"
            size={28}
            style={tw.style("my-2")}
          />
          <Text style={tw.style("text-xl text-gray-500 font-bold text-center")}>
            Academic Calendar
          </Text>
        </Pressable>
        {user && user.role !== "Instructor" ? (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate("Budget");
              }}
              style={tw.style(
                "flex-col p-3 border border-gray-400 rounded-3xl w-1/3 text-center items-center justify-center mt-4"
              )}
            >
              <Icon
                name="calendar"
                color="#424141"
                size={28}
                style={tw.style("my-2")}
              />
              <Text
                style={tw.style("text-xl text-gray-500 font-bold text-center")}
              >
                Budget Calendar
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("Plan");
              }}
              style={tw.style(
                "flex-col p-3 border border-gray-400 rounded-3xl w-1/3 text-center items-center justify-center mt-4"
              )}
            >
              <Icon
                name="calendar"
                color="#424141"
                size={28}
                style={tw.style("my-2")}
              />
              <Text
                style={tw.style("text-xl text-gray-500 font-bold text-center")}
              >
                Plan Calendar
              </Text>
            </Pressable>
          </>
        ) : null}
      </Surface>
      <ToastContainer position="top-center" />
    </SafeAreaView>
  );
};

async function schedulePushNotification(
  calendar = cal,
  today,
  tomorrow,
  afterTwoDays,
  notifications
) {
  await Notifications.setNotificationChannelAsync("in_three_days", {
    name:
      calendar.start_date === today
        ? "Activity today"
        : calendar.start_date === tomorrow
        ? "Activity tomorrow"
        : calendar.start_date === afterTwoDays
        ? "Activity within two says"
        : "Activity within tree days",
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title:
        calendar.start_date === today
          ? "Activity today"
          : calendar.start_date === tomorrow
          ? "Activity tomorrow"
          : calendar.start_date === afterTwoDays
          ? "Activity within two days"
          : "Activity within three days",
      body: `Title: ${calendar.title}, Start Date: ${calendar.start_date}, End Date:  ${calendar.start_date}`,
    },
    trigger: { seconds: 1, channelId: "in_three_days" },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default SecondMainScreen;
