import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { db } from "../configs/firebase";
import Screen from "../components/Screen";

//Utility Screens
import Loading from "../utils/Loading";

// Auth Screens Import
import LoginScreens from "../screens/Auth/LoginScreens";
import Type from "../screens/Auth/Type";
import OnboardingScreen from "../screens/Auth/OnboardingScreen";
import Details from "../screens/Auth/Details";
import SelectCity from "../screens/Auth/SelectCity";
import selectExpertise from "../screens/Auth/SelectExpertise";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import Register from "../screens/Auth/Register";

// Genaral MainTabs Screen Import
import HomeEmployee from "../screens/Employee/HomeEmployee";
import CreatePostEmployee from "../screens/Employee/CreatePostEmployee";
import ApplicantsEmployee from "../screens/Employee/ApplicantsEmployee";
import ProfileEmployee from "../screens/Employee/ProfileEmployee";
import ChatscreenEmpolyee from "../screens/Employee/ChatScreenEmployee";

import HomeClient from "../screens/Client/HomeClient";
import SavedJobs from "../screens/Client/SavedJobsClient";
import ProfileClient from "../screens/Client/ProfileClient";
import ChatscreenClient from "../screens/Client/ChatScreenClient";
import ApplicationClient from "../screens/Client/ApplicationClient";

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <>
      <AuthStack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: { backgroundColor: "#2CCFA1" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
        <AuthStack.Screen name="Login" component={LoginScreens} />
        <AuthStack.Screen name="Type" component={Type} />
        <AuthStack.Screen name="Details" component={Details} />
        <AuthStack.Screen name="SelectCity" component={SelectCity} />
        <AuthStack.Screen name="SelectExp" component={selectExpertise} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      </AuthStack.Navigator>
    </>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  // Handle db Usertype Resolving
  const [usertype, setUsertype] = React.useState(null);
  const { uid } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!uid) return;

    // Define a function to unsubscribe from both listeners when the component unmounts
    let unsubscribeEmp;
    let unsubscribeCli;

    // Check the 'employees' collection first
    unsubscribeEmp = db
      .collection("employees")
      .doc(uid)
      .onSnapshot((docSnapshot) => {
        if (docSnapshot.exists) {
          const userType = docSnapshot.data().type;
          setUsertype(userType);
        } else {
          // If not found in 'employees', check the 'clients' collection
          unsubscribeCli = db
            .collection("clients")
            .doc(uid)
            .onSnapshot((docSnapshot) => {
              if (docSnapshot.exists) {
                const userType = docSnapshot.data().type;
                setUsertype(userType);
              }
            });
        }
      });

    // Return a cleanup function that unsubscribes from both listeners
    return () => {
      unsubscribeEmp && unsubscribeEmp();
      unsubscribeCli && unsubscribeCli();
    };
  }, [uid]);

  console.log(usertype);

  // Render the appropriate screen based on usertype
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {usertype === null && (
        <MainStack.Screen name="Loading" component={Loading} />
      )}
      {usertype === 1 && (
        <MainStack.Screen name="MainEmps" component={MainEmps} />
      )}
      {usertype === 0 && (
        <MainStack.Screen name="MainClis" component={MainClis} />
      )}
    </MainStack.Navigator>
  );
};

// Icon Arrangemnt for BottomBar
const EmpBottomTabBar = ({ navigation, state }) => {
  const HomeIconEmp = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="home-outline" />
  );
  const CreatePostIconEmp = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="bookmark-outline" />
  );
  const ApplicantsIconEmp = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="briefcase-outline" />
  );
  const ChatIconEmp = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="message-square-outline" />
  );
  const ProfileIconEmp = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="person-outline" />
  );
  return (
    <BottomNavigation
      style={{
        backgroundColor: "#fff",
      }}
      noIndicator
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIconEmp} title="Home" />
      <BottomNavigationTab icon={CreatePostIconEmp} title="Create Post" />
      <BottomNavigationTab icon={ApplicantsIconEmp} title="Applicants" />
      <BottomNavigationTab icon={ChatIconEmp} title="Chat" />
      <BottomNavigationTab icon={ProfileIconEmp} title="Profile" />
    </BottomNavigation>
  );
};

const CliBottomTabBar = ({ navigation, state }) => {
  const HomeIconCli = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="home" />
  );
  const SavedIconCli = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="bookmark" />
  );
  const ApplicationIconCli = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="briefcase" />
  );
  const ChatIconCli = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="message-square" />
  );
  const ProfileIconCli = (props) => (
    <Icon {...props} fill={"rgb(37,176,137)"} name="person" />
  );
  return (
    <BottomNavigation
      style={{
        backgroundColor: "#fff",
      }}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIconCli} title="Home" />
      <BottomNavigationTab icon={SavedIconCli} title="Saved Jobs" />
      <BottomNavigationTab icon={ApplicationIconCli} title="Application" />
      <BottomNavigationTab icon={ChatIconCli} title="Chat" />
      <BottomNavigationTab icon={ProfileIconCli} title="Profile" />
    </BottomNavigation>
  );
};

// BottomNavigation Tab ConfigurationPpages
const Emp = createBottomTabNavigator();

const MainEmps = () => (
  <Emp.Navigator
    style={{ backgroundColor: "#2CCFA1" }}
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <EmpBottomTabBar {...props} />}
  >
    <Emp.Screen name="HomeEmp" component={HomeEmployee} />
    <Emp.Screen name="CreatePostEmp" component={CreatePostEmployee} />
    <Emp.Screen name="ApplicantsEmp" component={ApplicantsEmployee} />
    <Emp.Screen name="ChatEmp" component={ChatscreenEmpolyee} />
    <Emp.Screen name="ProfileEmp" component={ProfileEmployee} />
  </Emp.Navigator>
);

const Cli = createBottomTabNavigator();

const MainClis = () => (
  <Cli.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <CliBottomTabBar {...props} />}
  >
    <Cli.Screen name="HomeCli" component={HomeClient} />
    <Cli.Screen name="SavedJobsCli" component={SavedJobs} />
    <Cli.Screen name="ApplicationCli" component={ApplicationClient} />
    <Cli.Screen name="ChatCli" component={ChatscreenClient} />
    <Cli.Screen name="ProfileCli" component={ProfileClient} />
  </Cli.Navigator>
);

// Main App Rendering Fragment Using User Validation
export default function App() {
  const context = React.useContext(AuthContext);
  const user = context.user;
  const currentUser = context.currentUser;
  const uid = context.uid;
  console.log(user, uid, currentUser);

  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
}
