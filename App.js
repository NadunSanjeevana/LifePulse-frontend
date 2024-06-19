import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // or 'react-native-vector-icons/Ionicons'
import HomeScreen from "./App/screens/HomeScreen";
import CalendarScreen from "./App/screens/CalendarScreen";
import ProfileScreen from "./App/screens/ProfileScreen";
import ChartScreen from "./App/screens/ChartScreen";
import { AuthProvider } from "./App/Context/AuthContext"; // Import AuthProvider

const Tab = createBottomTabNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
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
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Chart" component={ChartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
