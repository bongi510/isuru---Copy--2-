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
import { Divider, Layout, Text, Button } from "@ui-kitten/components";
import { signOut } from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import Screen from "../../components/Screen";
import { AuthContext } from "../../provider/AuthProvider";
// import { StatusBar } from "expo-status-bar";
// import recommendationsData from "../../configs/recommendationsData.json";

const Header = ({ profileImageUrl }) => {
  const { uid } = React.useContext(AuthContext);
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = db
      .collection("employees")
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

  return (
    <Layout
      style={{
        padding: 1,
        paddingHorizontal: 3,
      }}
    >
      <Screen>
        <View style={styles.header}>
          <Image
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
              source={require("../../../assets/images/CardCli.png")}
              style={styles.cardImage}
            />
          </TouchableNativeFeedback>
        </View>
        <Text style={styles.recommendationTitle}>Recommendation</Text>
      </Screen>
    </Layout>
  );
};

export default function Home({ navigation }) {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfileImage();
    fetchRecommendations();
  }, []);

  const fetchProfileImage = async () => {
    // Fetch the profile image URL from Firebase Firestore using the user's ID
    // This is a placeholder function, replace with your actual Firebase Firestore fetch logic
    const imageUrl =
      "https://assets-global.website-files.com/650865454c2393ac25711ff7/650865454c2393ac25714a3e_The%20best%20selfie%20Ideas%20for%20sm%20pfp.jpeg"; // Replace with actual image URL
    setProfileImageUrl(imageUrl);
  };

  const fetchRecommendations = async () => {
    setLoading(true); // Start loading
    try {
      const querySnapshot = await db.collection("JobPost").get();
      const recommendationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Assuming you have a state setter function for storing the fetched posts
      setRecommendations(recommendationsData);
    } catch (e) {
      console.error("Error fetching posts:", e);
    }
    setLoading(false); // End loading
  };
  console.log(recommendations);

  const handleSearch = (text) => {
    setSearchText(text);
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
            category="h5"
            style={{
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {item.jobTitle}
          </Text>
          <Divider />
          <Text>{item.duration} Hours </Text>
          <Text>{item.location}</Text>
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
          <View
            style={{
              alignItems: "flex-start",
            }}
          >
            <Button
              size="tiny"
              style={{
                marginHorizontal: 5,
                padding: 3,
                marginVertical: 4,
              }}
              status={"success"}
              appearance="outline"
            >
              {item.employmentType}
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
      <Divider />
    </>
  );

  return (
    <Screen>
      <Layout>
        <FlatList
          data={recommendations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchRecommendations}
            />
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
