// MyCard.js
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Layout } from "@ui-kitten/components";

const MyCard = ({ title, children }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle} category="h6">
        {title}
      </Text>
      <Layout style={styles.formContainer}>{children}</Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 8,
    zIndex: 1, // Ensure the card has a higher z-index
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  formContainer: {
    marginBottom: 20,
    marginHorizontal: 5,
    paddingBottom: 20,
    zIndex: 0, // Lower z-index for the form container
  },
});

export default MyCard;
