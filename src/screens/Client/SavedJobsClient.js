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
  const [savedJobList, setSavedJobList] = useState(data);

  const data = [
    {
      id: "1",
      title: "Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Innovate Ltd",
      location: "New York, NY",
    },
    // ... more jobs
  ];

  const renderItem = ({ item }) => (
    <Layout style={styles.container}>
      <TouchableNativeFeedback onPress={() => console.log("Pressed item")}>
        <View style={styles.recommendationItem}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              category="h5"
              style={{
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
            <Button
              appearance="ghost"
              accessoryLeft={(props) => <Icon {...props} name="bell-outline" />}
              onPress={() => console.log("Notification pressed")}
            />
          </View>
          <Text category="p2">Posed Date: {item.date}</Text>
          <Divider />
          <Text>{item.hours} Hours </Text>
          <Text>{item.location} hours</Text>
          <Text>{item.city}</Text>
          <Text
            category="p2"
            style={{
              fontWeight: "bold",
              color: "#2CCFA1",
            }}
          >
            Rs:{item.salary} /= (Per Day)
          </Text>
          <Text>{item.duration}</Text>
        </View>
      </TouchableNativeFeedback>
    </Layout>
  );

  return (
    <Screen backAction={() => navigation.goBack()} headerTitle="Saved job">
      <Layout>
        <FlatList
          data={savedJobList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
});

export default ApplicantsEmployee;
