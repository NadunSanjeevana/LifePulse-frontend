import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import WelcomeHeader from "../Components/WelcomeHeader";
import SearchBar from "../Components/SearchBar";
import Slider from "../Components/Slider";
import { AuthContext } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [activities, setActivities] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState("");
  const navigation = useNavigation();

  const addActivity = () => {
    setActivities({
      ...activities,
      [selectedDate]: [...(activities[selectedDate] || []), newActivity],
    });
    setNewActivity("");
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Dashboard background */}
      <View style={styles.dashboard}>
        <View style={styles.backgroundRectangle}></View>
        <View style={styles.shape}></View>
        <View style={styles.ellipse1}></View>
        <View style={styles.ellipse2}></View>
        {/* Additional elements like notification, wifi, signal, battery, time can be added here */}
        {/* For simplicity, I'm skipping those details since they were provided separately */}
      </View>

      {/* Welcome message */}
      <Image
        source={require("../Assets/Images/login.png")}
        style={styles.profileImage}
      />
      <Text style={styles.welcomeText}>Welcome, Jane Doe</Text>

      {/* Other sections (Tasks List, Calendar, etc.) */}
      <Text style={styles.sectionTitle}>Tasks List</Text>
      {/* Inserting other sections (Tasks, Calendar, etc.) can be done here */}
      <View style={styles.tasksList}>
        <Text style={styles.taskText}>Today Tasks</Text>
        {/* Other task items can be added here */}
      </View>

      {/* Button to navigate to CalendarScreen */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CalendarScreen")}
      >
        <View style={styles.plusCircle}>
          <View style={styles.circleBorder}></View>
          <View style={styles.verticalLine}></View>
          <View style={styles.horizontalLine}></View>
        </View>
      </TouchableOpacity>

      {/* Modal for adding activities */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter Activity"
              value={newActivity}
              onChangeText={setNewActivity}
              style={styles.textInput}
            />
            <Button title="Add" onPress={addActivity} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  dashboard: {
    position: "relative",
    width: 375,
    height: 812,
    backgroundColor: "#F6F6F6",
  },
  backgroundRectangle: {
    position: "absolute",
    width: 375,
    height: 307,
    left: 0,
    top: 0,
    backgroundColor: "#6AE08B",
  },
  shape: {
    position: "absolute",
    width: 290,
    height: 270,
    left: -99,
    top: -109,
    backgroundColor: "rgba(191, 218, 216, 0.49)",
  },
  ellipse1: {
    position: "absolute",
    width: "31.03%",
    height: "100%",
    left: 0,
    backgroundColor: "rgba(191, 218, 216, 0.49)",
  },
  ellipse2: {
    position: "absolute",
    width: "31.03%",
    height: "100%",
    right: 0,
    backgroundColor: "rgba(191, 218, 216, 0.49)",
  },
  profileImage: {
    position: "absolute",
    width: 100,
    height: 100,
    left: 141,
    top: 133,
    borderWidth: 3,
    borderColor: "#2B8E94",
  },
  welcomeText: {
    position: "absolute",
    width: 199,
    height: 21,
    left: 79,
    top: 251,
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 0.06,
    color: "#FFFFFF",
    fontFamily: "Poppins",
  },
  sectionTitle: {
    position: "absolute",
    width: 97,
    height: 21,
    left: 27,
    top: 487,
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Poppins",
  },
  tasksList: {
    position: "absolute",
    width: 323,
    height: 248,
    left: 31,
    top: 528,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  taskText: {
    position: "absolute",
    width: 96,
    height: 16,
    left: 52,
    top: 554,
    fontWeight: "400",
    fontSize: 14,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Poppins",
  },
  addButton: {
    position: "absolute",
    width: 24,
    height: 24,
    left: 306,
    top: 550,
  },
  plusCircle: {
    width: "100%",
    height: "100%",
    borderColor: "#2D8F95",
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  circleBorder: {
    position: "absolute",
    width: "80%",
    height: 2,
    backgroundColor: "#2D8F95",
  },
  verticalLine: {
    position: "absolute",
    width: 2,
    height: "80%",
    backgroundColor: "#2D8F95",
  },
  horizontalLine: {
    position: "absolute",
    width: "80%",
    height: 2,
    backgroundColor: "#2D8F95",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
