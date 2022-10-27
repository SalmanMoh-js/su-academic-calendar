import React from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";
import tw from "twrnc";
import { useEffect } from "react";
import { Badge } from "@react-native-material/core";
import { useLayoutEffect } from "react";
import { clearNotifications } from "../Actions/getDataAction";
import ago from "s-ago";

export default function NotificationsScreen() {
  const { notifications } = useSelector((state) => state.data);
  const dispatch = useDispatch();
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
  const uniques = [];
  const uniqueNotifications = notifications.filter((element) => {
    const isDuplicate = uniques.includes(element.id);
    if (!isDuplicate) {
      uniques.unshift(element.id);
      return true;
    }
    return false;
  });
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      {!notifications.length ? (
        <Text className="flex self-center font-bold justify-self-center text-lg text-gray-500">
          No new notifications
        </Text>
      ) : (
        <FlatList
          style={tw.style("w-full")}
          data={uniqueNotifications}
          ListHeaderComponent={null}
          ListFooterComponent={null}
          renderItem={({ item }) => (
            <List.Accordion
              title={item.title}
              description={item.description}
              style={tw.style("w-full bg-slate-100 text-blue-300")}
              titleStyle={tw.style("text-gray-700")}
              descriptionStyle={tw.style("text-gray-500")}
              right={(props) => (
                <View className="flex flex-col">
                  <Badge
                    label={
                      item.start_date === afterThreeDays
                        ? "After three days"
                        : item.start_date === afterTwoDays
                        ? "After two days"
                        : item.start_date === tomorrow
                        ? "Tomorrow"
                        : "Today"
                    }
                    color="secondary"
                  />
                  <Text style={tw.style("mt-2")}>
                    {ago(new Date(item.timeStamp))}
                  </Text>
                </View>
              )}
            >
              <List.Item
                title="Start Date"
                description={item.start_date}
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
              />
              <List.Item
                title="End Date"
                description={item.end_date}
                style={tw.style("bg-slate-200 text-blue-300")}
                titleStyle={tw.style("text-gray-700")}
                descriptionStyle={tw.style("text-gray-500")}
              />
            </List.Accordion>
          )}
        />
      )}
    </SafeAreaView>
  );
}
