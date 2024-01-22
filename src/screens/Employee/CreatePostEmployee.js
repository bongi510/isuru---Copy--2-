import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import {
  Button,
  Layout,
  Text,
  Input,
  Select,
  IndexPath,
  SelectItem,
  Divider,
} from "@ui-kitten/components";
import Screen from "../../components/Screen";
import Newcard from "../../components/NewCard";
import jobTitle from "../../configs/jobTitle.json";
import cityData from "../../configs/cityData.json";
import { auth, db } from "../../configs/firebase";

export default function ({ navigation }) {
  const [profilePicture, SetProfilePicture] = useState(null);
  const [location, setLocation] = useState(
    "No:1/153,Puwakwatta,Millewa,Horana"
  );
  const [city, setCity] = useState("");
  const [salary, setSalary] = useState("3000");
  const [employmentType, setEmploymentType] = useState("Part-Time");
  const [duration, setDuration] = useState("10");
  const [description, setDescription] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [selectedCityIndex, setSelectedCityIndex] = useState(new IndexPath(0));

  const displayValue = jobTitle[selectedIndex.row];
  const displayCityValue = cityData[selectedCityIndex.row].city;

  const toggleEmploymentType = () => {
    setEmploymentType(
      employmentType === "Part-Time" ? "Full-Time" : "Part-Time"
    );
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle="Create Post"
    >
      <ScrollView>
        <Divider />
        <Layout style={styles.container}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 20,
              alignItems: "center",
            }}
            category="h6"
          >
            Create Your Post
          </Text>

          <Layout style={styles.formContainer}>
            <View
              style={{
                flexDirection: "column",

                alignItems: "left",
              }}
            >
              <Select
                label={"Job Title"}
                value={selectedJobTitle}
                style={styles.select}
                selectedIndex={selectedIndex}
                onSelect={(index) => {
                  setSelectedIndex(index);
                  setSelectedJobTitle(jobTitle[index.row]);
                }}
              >
                {jobTitle.map((title, index) => (
                  <SelectItem key={index} title={title} />
                ))}
              </Select>
              <Select
                label="City"
                selectedIndex={selectedCityIndex}
                value={displayCityValue}
                onSelect={(index) => setSelectedCityIndex(index)}
              >
                {cityData.map((item, index) => (
                  <SelectItem key={index} title={item.city} />
                ))}
              </Select>
              <Input
                status="success"
                label="Location"
                value={location}
                onChangeText={setLocation}
                placeholder="Location"
              />
              <Input
                status="success"
                label="Salary"
                value={salary}
                onChangeText={setSalary}
                placeholder="Salary"
              />
              <Input
                status="success"
                value={duration}
                label="Duration"
                onChangeText={setDuration}
                placeholder="Duration in Hours"
              />
              <Input
                status="success"
                value={description}
                label="Description"
                onChangeText={setDescription}
                placeholder="Description"
              />
              <Button
                style={{
                  marginTop: 10,
                }}
                status="danger"
                appearance="outline"
                onPress={toggleEmploymentType}
              >
                {employmentType}
              </Button>
              <Button
                style={styles.publishButton}
                appearance="outline"
                status="success"
                disabled={
                  !selectedJobTitle ||
                  !displayCityValue ||
                  !location ||
                  !salary ||
                  !duration ||
                  !description ||
                  !employmentType
                }
              >
                Publish
              </Button>
            </View>
          </Layout>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                marginTop: 15,
                alignItems: "center",
              }}
              category="h6"
            >
              How it looks
            </Text>
            <Newcard
              avatarUrl={
                "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"
              }
              Jobtitle={displayValue}
              Location={location}
              City={displayCityValue}
              Salary={salary}
              Duration={duration}
              emptype={employmentType}
            />
          </View>
        </Layout>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 19,
    paddingBottom: 20,
    alignItems: "left",
  },
  formContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 15,
  },
  select: {},
  publishButton: {
    alignItems: "center",
    width: "100%",
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6,
    justifyContent: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.3)", // Add an overlay to the image
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  card: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
