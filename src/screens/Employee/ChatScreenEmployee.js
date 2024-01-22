// ChatListScreen.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Layout, Text, Avatar } from "@ui-kitten/components";
import { ChatScreen } from "../../components/ChatCard";

export default function ({ navigation }) {
  const [chats, setChats] = useState([]);

  const navigateToChat = (chatId) => {
    // Navigate to individual chat screen with the chatId
    navigation.navigate("ChatScreen", { chatId });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToChat(item.id)}
      style={styles.chatItem}
    >
      <Avatar source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text category="s1">{item.name}</Text>
        <Text category="c1">{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: "100%",
  },
  chatItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
    justifyContent: "center",
  },
});
