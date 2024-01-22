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

  // console.log("User:", user, "CurrentUser:", currentUser, "Userid:", uid);

  useEffect(() => {
    fetchProfileImage();
    fetchRecommendations();
  }, []);

  const fetchProfileImage = async () => {
    // Fetch the profile image URL from Firebase Firestore using the user's ID
    // This is a placeholder function, replace with your actual Firebase Firestore fetch logic
    const imageUrl =
      "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"; // Replace with actual image URL
    setProfileImageUrl(imageUrl);
  };

  const fetchRecommendations = async () => {
    // Fetch recommendations from Firebase Firestore
    // This is a placeholder function, replace with your actual Firebase Firestore fetch logic

    setRecommendations(recommendationsData);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // Add logic to filter the recommendations based on the search text
  };

  const renderItem = ({ item }) => (
    <Layout
      style={{
        paddingHorizontal: 28,
        paddingBottom: 10,
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
          <Button
            size="tiny"
            status="success"
            appearance="outline"
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginRight: 210,
              category: "p2",
            }}
          >
            Post Details
          </Button>
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

  const renderHeader = () => (
    <>
      <Header profileImageUrl={profileImageUrl} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
      <Divider />
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
