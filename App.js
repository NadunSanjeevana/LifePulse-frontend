import "react-native-gesture-handler"; // <- Add this at the top of your entry file
import * as React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./App/screens/HomeScreen";
import CalendarScreen from "./App/screens/CalendarScreen";
import ProfileScreen from "./App/screens/ProfileScreen";
import ChartScreen from "./App/screens/ChartScreen";
import OnboardingScreen from "./App/screens/OnboardingScreen";
import SignInScreen from "./App/screens/SignInScreen";
import RegisterScreen from "./App/screens/RegisterScreen";
import UploadScreen from "./App/screens/UploadScreen";
import { AuthProvider } from "./App/Context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Upload") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          } else if (route.name === "Chart") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6AE08B",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#d3f9d8", // Change this color to your desired background color
          borderTopColor: "transparent", // Optional: Removes top border of the tab bar
          paddingBottom: 5, // Optional: Adjust padding as needed
          paddingTop: 5, // Optional: Adjust padding as needed
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Chart" component={ChartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default gestureHandlerRootHOC(App);
