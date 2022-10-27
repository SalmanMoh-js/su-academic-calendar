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
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import {
  resetData,
  getAcademicCalendar,
  getBudgetCalendar,
  getPlanCalendar,
  setNotif,
} from "../Actions/getDataAction";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_ACADEMIC_CALENDAR_FETCH_TASK =
  "background-academic-calendar-fetch";
const BACKGROUND_BUDGET_CALENDAR_FETCH_TASK =
  "background-budget-calendar-fetch";
const BACKGROUND_PLAN_CALENDAR_FETCH_TASK = "background-plan-calendar-fetch";
TaskManager.defineTask(BACKGROUND_ACADEMIC_CALENDAR_FETCH_TASK, async () => {
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
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await axios.get(
      "http://ethioumrah.vohealth.org/api/calendar/academic-calendar",
      { headers }
    );
    console.log(res.data[0].start_date);
    let in3days = res.data.filter(
      (calendar) =>
        calendar.start_date === afterThreeDays ||
        calendar.start_date === afterTwoDays ||
        calendar.start_date === tomorrow ||
        calendar.start_date === today
    );
    console.log(in3days);
    if (in3days.length) {
      const lastNotifTime = await AsyncStorage.getItem("lastNotifTime");
      const now = new Date();
      const beforeFourHours = now.setHours(now.getHours() - 4);
      if (parseInt(lastNotifTime) < new Date(beforeFourHours).getTime()) {
        await in3days.map(async (calendar) => {
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
        });
        AsyncStorage.setItem("lastNotifTime", new Date().getTime().toString());
      }
    }
  } catch (err) {}
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

TaskManager.defineTask(BACKGROUND_BUDGET_CALENDAR_FETCH_TASK, async () => {
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
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await axios.get(
      "http://ethioumrah.vohealth.org/api/calendar/budget-calendar",
      { headers }
    );
    console.log(res.data[0].start_date);
    let in3days = res.data.filter(
      (calendar) =>
        calendar.start_date === afterThreeDays ||
        calendar.start_date === afterTwoDays ||
        calendar.start_date === tomorrow ||
        calendar.start_date === today
    );
    console.log(in3days);
    if (in3days.length) {
      const lastNotifTime = await AsyncStorage.getItem("lastNotifTime");
      const now = new Date();
      const beforeFourHours = now.setHours(now.getHours() - 4);
      if (parseInt(lastNotifTime) < new Date(beforeFourHours).getTime()) {
        await in3days.map(async (calendar) => {
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
        });
        AsyncStorage.setItem("lastNotifTime", new Date().getTime().toString());
      }
    }
  } catch (err) {}
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

TaskManager.defineTask(BACKGROUND_PLAN_CALENDAR_FETCH_TASK, async () => {
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
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await axios.get(
      "http://ethioumrah.vohealth.org/api/calendar/plan-calendar",
      { headers }
    );
    console.log(res.data[0].start_date);
    let in3days = res.data.filter(
      (calendar) =>
        calendar.start_date === afterThreeDays ||
        calendar.start_date === afterTwoDays ||
        calendar.start_date === tomorrow ||
        calendar.start_date === today
    );
    console.log(in3days);
    if (in3days.length) {
      const lastNotifTime = await AsyncStorage.getItem("lastNotifTime");
      const now = new Date();
      const beforeFourHours = now.setHours(now.getHours() - 4);
      if (parseInt(lastNotifTime) < new Date(beforeFourHours).getTime()) {
        await in3days.map(async (calendar) => {
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
        });
        AsyncStorage.setItem("lastNotifTime", new Date().getTime().toString());
      }
    }
  } catch (err) {}
  return BackgroundFetch.BackgroundFetchResult.NewData;
});
async function registerBackgroundAcademicCalendarFetchAsync() {
  return BackgroundFetch.registerTaskAsync(
    BACKGROUND_ACADEMIC_CALENDAR_FETCH_TASK,
    {
      minimumInterval: 30 * 60,
      stopOnTerminate: false,
      startOnBoot: true,
    }
  );
}

async function registerBackgroundBudgetCalendarFetchAsync() {
  return BackgroundFetch.registerTaskAsync(
    BACKGROUND_BUDGET_CALENDAR_FETCH_TASK,
    {
      minimumInterval: 30 * 60,
      stopOnTerminate: false,
      startOnBoot: true,
    }
  );
}

async function registerBackgroundPlanCalendarFetchAsync() {
  return BackgroundFetch.registerTaskAsync(
    BACKGROUND_PLAN_CALENDAR_FETCH_TASK,
    {
      minimumInterval: 30 * 60,
      stopOnTerminate: false,
      startOnBoot: true,
    }
  );
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const BackgroundActivity = () => {
  const { user } = useSelector((state) => state.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
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

  const fetchTask = async () => {
    await registerBackgroundAcademicCalendarFetchAsync();
    if (user) {
      await registerBackgroundBudgetCalendarFetchAsync();
      await registerBackgroundPlanCalendarFetchAsync();
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);

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
  return null;
};

async function schedulePushNotification(
  calendar = cal,
  today,
  tomorrow,
  afterTwoDays
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

export default BackgroundActivity;
