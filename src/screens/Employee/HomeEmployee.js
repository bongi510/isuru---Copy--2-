import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  ImageBackground,
  Image,
  TextInput,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  RefreshControl,
} from "react-native";
import { Divider, Layout, Text, Button, Avatar } from "@ui-kitten/components";
import { signOut } from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import Screen from "../../components/Screen";
import recommendationsData from "../../configs/recommendationsData.json";
import { AuthContext } from "../../provider/AuthProvider";
import { StatusBar } from "expo-status-bar";

const Header = ({ profileImageUrl }) => {
  const { uid } = React.useContext(AuthContext);
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = db
      .collection("clients")
      .doc(uid)
      .onSnapshot((docSnapshot) => {
        if (docSnapshot.exists) {
          const nickNameFromDoc = docSnapshot.data().nickName;
          setNickName(nickNameFromDoc);
        }
      });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  // Logging Out Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  console.log(nickName);
  return (
    <Layout
      style={{
        padding: 1,
        paddingHorizontal: 3,
      }}
    >
      <Screen>
        <View style={styles.header}>
          <Avatar
            source={{ uri: profileImageUrl }}
            style={styles.profileImage}
          />
          <View
            style={{
              marginLeft: 30,
              height: 20,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              Good Morning
            </Text>
            <Text
              style={{
                fontSize: 19,
                fontWeight: "bold",
              }}
            >
              {nickName}
            </Text>
          </View>
          <Button
            style={{
              marginTop: 10,
              marginLeft: "36%",
              alignContent: "center",
            }}
            size="tiny"
            appearance="outline"
            status="success"
            onPress={handleLogout}
          >
            Logout
          </Button>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableNativeFeedback>
            <ImageBackground
              source={require("../../../assets/images/CardEmp.png")}
              style={styles.cardImage}
            />
          </TouchableNativeFeedback>
        </View>
        <Text style={styles.recommendationTitle}>Your Posted Jobs</Text>
        <Divider />
      </Screen>
      <StatusBar hidden={true} style="auto" />
    </Layout>
  );
};

export default function ({ navigation }) {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const { uid } = React.useContext(AuthContext);

  const fetchPostedJobs = () => {
    const unsubscribe = db
      .collection("yourJobPost")
      .doc(uid)
      .collection("posts") // Access the 'posts' subcollection of the user's document
      .onSnapshot((querySnapshot) => {
        const postedJobs = [];
        querySnapshot.forEach((doc) => {
          postedJobs.push({ id: doc.id, ...doc.data() }); // Collect each job post into an array
        });
        setPostedJobs(postedJobs); // Update the state with the array of job posts
        console.log(postedJobs);
      });
    return unsubscribe; // Return the unsubscribe function to call it later for cleanup
  };

  useEffect(() => {
    fetchProfileImage();
    fetchRecommendations();
    fetchPostedJobs();
  }, []);
  console.log(postedJobs);

  const fetchProfileImage = async () => {
    const imageUrl =
      "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"; // Replace with actual image URL
    setProfileImageUrl(imageUrl);
  };

  const fetchRecommendations = async () => {
    setRecommendations(recommendationsData);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // Add logic to filter the recommendations based on the search text
  };

  const renderItem = ({ item }) => (
    <Layout
      style={{
        marginHorizontal: 20,
        paddingVertical: 19,
        height: 210,
        margin: 10,
        paddingBottom: 1,
      }}
    >
      <TouchableNativeFeedback onPress={() => console.log("Pressed item")}>
        <View style={styles.recommendationItem}>
          <Text
            category="h6"
            style={{
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text category="p2">Posed Date: {item.date}</Text>
          <Divider />
          <View
            style={{
              alignItems: "flex-start",
              padding: "1",
              marginVertical: 2,
            }}
          >
            <Button
              size="tiny"
              status="success"
              appearance="filled"
              style={{
                padding: "1",
              }}
            >
              Post Details
            </Button>
          </View>
          <Text category="c1">{item.hours} Hours </Text>
          <Text category="c1">{item.location} hours</Text>
          <Text category="c1">{item.city}</Text>
          <Text
            category="c2"
            style={{
              fontWeight: "bold",
              color: "#2CCFA1",
            }}
          >
            Rs:{item.salary} /~ (Per Day)
          </Text>
          <Text>{item.duration}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Button
              size="tiny"
              status="success"
              appearance="filled"
              style={{ borderRadius: 25, marginBottom: 3 }}
            >
              Application Details
            </Button>
            <Button
              size="tiny"
              status="danger"
              appearance="filled"
              style={{ borderRadius: 25 }}
            >
              Edit Post
            </Button>
          </View>
        </View>
      </TouchableNativeFeedback>
    </Layout>
  );

  const renderHeader = () => (
    <>
      <Header profileImageUrl={profileImageUrl} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
    </>
  );

  return (
    <Screen>
      <Layout>
        <FlatList
          data={recommendations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => {}} />
          }
          contentContainerStyle={styles.listContainer}
        />
      </Layout>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 3,
    width: 60,
    padding: 2,
    height: 60,
    borderRadius: 23,
  },
  searchBar: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 19,
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
    paddingHorizontal: 15,
    paddingBottom: 10,
    padding: 6,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: "gray",
  },
});
