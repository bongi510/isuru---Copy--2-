import React, { useContext } from "react";
import {
  Layout,
  Button,
  Icon,
  Card,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { Pressable } from "react-native";
import { ThemeContext } from "../configs/Theme";

export const ProfileCard = ({
  email,
  onPress,
  onEditPress,
  name,
  addName = false,
  staff = false,
  weight,
  age,
}) => {
  const themeContext = useContext(ThemeContext);
  const LogoutIcon = (props) => <Icon {...props} name="log-out" />;
  const theme = useTheme();

  return (
    <Card style={{ marginHorizontal: "3%", marginBottom: "1%" }} disabled>
      <Layout>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Pressable
            onPress={onEditPress}
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: theme["color-primary-500"],
              padding: 20,
              borderRadius: 25,
              elevation: 2,
              marginRight: 15,
            }}
          >
            <Icon
              style={{ width: 40, height: 40 }}
              fill={theme["color-primary-100"]}
              name="person"
            />
            <Layout
              style={{
                backgroundColor:
                  themeContext.theme == "light"
                    ? theme["color-success-default"]
                    : theme["color-success-400"],
                padding: 5,
                borderRadius: 25,
                elevation: 2,
                position: "absolute",
                right: -3,
                top: -3,
              }}
            >
              <Icon
                style={{
                  width: 15,
                  height: 15,
                }}
                fill={theme["color-success-100"]}
                name="edit-2"
              />
            </Layout>
          </Pressable>
          <Layout style={{ justifyContent: "center" }}>
            <Text style={{ margin: "1%", fontWeight: "bold" }} category="h5">
              {name} ({age})
            </Text>

            <Text style={{ margin: "1%" }} category="h6">
              {email}
            </Text>
            <Text style={{ margin: "1%" }} category="h6">
              Weight : {weight}kg
            </Text>
          </Layout>
        </Layout>
        <Button
          style={{
            marginTop: 20,
            borderRadius: 5,
          }}
          onPress={onPress}
          accessoryRight={LogoutIcon}
        >
          Logout
        </Button>
      </Layout>
    </Card>
  );
};
