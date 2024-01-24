import { View, Text } from "react-native";
import React from "react";

export default function () {
  const onpress = () => {
    console.log("hello");
  };

  return (
    <View>
      <Button onPress={onpress}>pressme </Button>
    </View>
  );
}
