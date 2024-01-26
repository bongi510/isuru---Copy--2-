import React, { useState, useEffect, useMemo } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  RefreshControl,
} from "react-native";
import { Divider, Layout, Text, Button, Icon } from "@ui-kitten/components";
import Screen from "../../components/Screen";
import { db } from "../../configs/firebase";
import { AuthContext } from "../../provider/AuthProvider";

export default function SavedJobsClient({ navigation }) {
  const [savedJobList, setSavedJobList] = useState([]);
  const { uid } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [jobids, setJobId] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const ids = useMemo(() => jobids.map((job) => job.id), [jobids]);

  async function fetchPosts() {
    setLoading(true);
      try {
        // Fetch the client's username from the 'clients' collection
        const docSnapshot = await db.collection("clients").doc(uid).get();
        let userName = "";
        if (docSnapshot.exists) {
          userName = docSnapshot.data().nickName;
        }
      const querySnapshot = await db
        .collection("savedJobs")
        .where("uid", "==", uid)
        .get();
        let postid = [];
        if (docSnapshot.exists) {
          postid = docSnapshot.data().id;
        }

    const ids = postid.map((postid) => postid.id);

    try {
      const querySnapshot = await db
        .collection("savedJobPost")
        .where("id", "==", ids)
        .get();

      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSavedJobList(posts);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }

  const renderItem = ({ item }) => (
    <Layout style={styles.container}>
      <TouchableNativeFeedback onPress={() => console.log("Pressed item")}>
        <View style={styles.savedPost}>
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
              accessoryLeft={(props) => (
                <Icon {...props} name="bookmark-outline" />
              )}
              onPress={() => handleAddToWishlist(item.id, item.user)}
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
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
          }
          contentContainerStyle={styles.listContainer}
        />
      </Layout>
    </Screen>
  );
}
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
  savedPost: {
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
  listContainer: {
    paddingBottom: 20,
  },
});
