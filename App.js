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
import OnboardScreen from "./App/screens/OnboardingScreen";
import SignInScreen from "./App/screens/Login";
import RegisterScreen from "./App/screens/Login";
import { AuthProvider } from "./App/Context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Chart") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6AE08B",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chart" component={ChartScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboard">
          <Stack.Screen
            name="Onboard"
            component={OnboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={MainTabs}
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
