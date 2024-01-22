import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import {
  Input,
  Button,
  Icon,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import Screen from "../../components/Screen";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { updateDoc, doc, getFirestore } from "firebase/firestore/lite";

export default function Profile({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();
  const theme = useTheme();
  const [name, setName] = useState(""); // Replace with user.name if available
  const [email, setEmail] = useState(""); // Replace with user.email if available
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  const EditIcon = (props) => <Icon {...props} name="edit-2-outline" />;
  const CancelIcon = (props) => <Icon {...props} name="slash-outline" />;
  const SaveIcon = (props) => <Icon {...props} name="save-outline" />;

  const resetPassword = async () => {
    setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        alert("Your password reset link has been sent to your email");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  const updateUser = async () => {
    setLoading(true);
    const userDocRef = doc(db, "users", auth.currentUser.uid); // Replace "users" with your collection name
    await updateDoc(userDocRef, {
      name: name,
      email: email,
      // Add other fields to update as needed
    })
      .then(() => {
        setLoading(false);
        alert("Profile updated successfully");
        setVisibility(true);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <Screen backAction={() => navigation.goBack()} headerTitle="Profile">
      <Layout style={styles.container}>
        <Input
          style={styles.input}
          size="large"
          status="primary"
          value={name}
          label="Name"
          placeholder="Your Name"
          onChangeText={setName}
          disabled={visibility}
        />
        <Input
          style={styles.input}
          size="large"
          status="primary"
          value={email}
          label="Email"
          placeholder="Your Email"
          onChangeText={setEmail}
          disabled={visibility}
        />
        {visibility ? (
          <Button
            accessoryRight={EditIcon}
            style={styles.button}
            status="warning"
            onPress={() => setVisibility(false)}
          >
            Edit
          </Button>
        ) : (
          <View style={styles.buttonGroup}>
            <Button
              accessoryRight={CancelIcon}
              status="basic"
              onPress={() => setVisibility(true)}
            >
              Cancel
            </Button>
            <Button
              accessoryRight={SaveIcon}
              status="success"
              onPress={updateUser}
            >
              Save
            </Button>
          </View>
        )}
        <Button
          style={styles.button}
          status="danger"
          onPress={resetPassword}
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Password"}
        </Button>
      </Layout>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});
