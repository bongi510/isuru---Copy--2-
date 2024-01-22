import React from "react";
import { Text, Layout, useTheme } from "@ui-kitten/components";
import SelectButton from "./SelectButton";

export const AreaCard = ({ title = "", onPress, value }) => {
  const theme = useTheme();
  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: theme["color-success-100"],
        padding: 5,
        borderRadius: 10,
      }}
    >
      <Layout
        style={{ backgroundColor: theme["color-success-100"], padding: 10 }}
      >
        <Text category="label" style={{ fontWeight: "bold" }}>
          {title}
        </Text>
      </Layout>
      <SelectButton value={value} onPress={onPress}></SelectButton>
    </Layout>
  );
};
