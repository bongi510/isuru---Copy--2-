import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { Divider, Layout, Text, Button, Icon } from "@ui-kitten/components";
import Screen from "../../components/Screen";

const ApplicantsEmployee = ({ navigation }) => {
  const [savedJobList, setSavedJobList] = useState([
    // Replace this with your actual JSON data
    {
      id: "1",
      name: "Dasun Indrajith",
      location: "1/153,millewa,horana",
      pnumber: "0775645445",
    },
    {
      id: "2",
      name: "Dasun Indrajith",
      location: "1/153,millewa,horana",
      pnumber: "0775645445",
    },
    {
      id: "3",
      name: "Dasun Indrajith",
      location: "1/153,millewa,horana",
      pnumber: "0775645445",
    },
    {
      id: "4",
      name: "Dasun Indrajith",
      location: "1/153,millewa,horana",
      pnumber: "0775645445",
    },
  ]);
  const [selectedRating, setSelectedRating] = useState(null);
  const renderItem = ({ item }) => (
    <Layout style={styles.container}>
      <TouchableNativeFeedback onPress={() => console.log("Pressed item")}>
        <View style={styles.recommendationItem}>
          <View
            style={{
              flexDirection: "row",
              alignitem: "left",
              justifyContent: "left",
            }}
          >
            <Text category="p1" style={{ fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Button
              size="tiny"
              appearance="ghost"
              accessoryLeft={(props) => (
                <Icon {...props} name="message-square-outline" />
              )}
              onPress={() => console.log("Notification pressed")}
            />
          </View>
          <Divider />
          <Text>{item.location}</Text>
          <Button
            category="p2"
            appearance="ghost"
            status="success"
            style={{
              marginRight: "70%",
              width: "100%",
              alignSelf: "center",
              fontWeight: "bold",
              color: "#2CCFA1",
            }}
          >
            {item.pnumber}
          </Button>
        </View>
      </TouchableNativeFeedback>
    </Layout>
  );

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle="Applicants"
    >
      <Layout
        style={{
          marginTop: 10,
          padding: 10,
          paddingBottom: 40,
          borderWidth: 2,
          borderRadius: 9,
          borderColor: "gray",
          width: "95%",
          height: "90%",
          alignSelf: "center",
        }}
      >
        <Text category="p1" style={{ paddingLeft: 15, fontWeight: "bold" }}>
          Your Job Applicants
        </Text>
        <View>
          <FlatList
            data={savedJobList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Layout>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 2,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    paddingLeft: 15,
    paddingTop: 15,
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginBottom: 5,
  },
  searchBar: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
  cardImage: {
    width: 360,
    height: 160,
    resizeMode: "cover",
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 6,
    marginTop: 9,
  },
  recommendationItem: {
    marginTop: 10,
    padding: 19,
    paddingHorizontal: 15,
    paddingBottom: 10,
    padding: 10,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: "gray",
  },
  starRating: { marginLeft: 50 },
});

export default ApplicantsEmployee;
