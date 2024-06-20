import React, { useContext, useState, useEffect } from "react";
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
import DateTimePicker from "react-native-modal-datetime-picker";
import { AuthContext } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = () => {
  const { userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [activities, setActivities] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [isTimeFromPickerVisible, setTimeFromPickerVisibility] =
    useState(false);
  const [isTimeToPickerVisible, setTimeToPickerVisibility] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setSelectedDate(formattedDate);
  }, []);

  const addActivity = () => {
    const newEntry = { task: newActivity, timeFrom, timeTo };
    setActivities({
      ...activities,
      [selectedDate]: [...(activities[selectedDate] || []), newEntry],
    });
    setNewActivity("");
    setTimeFrom("");
    setTimeTo("");
    setModalVisible(false);
  };

  const showTimeFromPicker = () => {
    setTimeFromPickerVisibility(true);
  };

  const hideTimeFromPicker = () => {
    setTimeFromPickerVisibility(false);
  };

  const handleTimeFromConfirm = (time) => {
    setTimeFrom(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimeFromPicker();
  };

  const showTimeToPicker = () => {
    setTimeToPickerVisibility(true);
  };

  const hideTimeToPicker = () => {
    setTimeToPickerVisibility(false);
  };

  const handleTimeToConfirm = (time) => {
    setTimeTo(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimeToPicker();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.backgroundRectangle}>
          <Image
            source={require("../Assets/Images/login.png")}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>Welcome, Jane Doe</Text>
        </View>
        <View style={styles.shape}></View>
        <View style={styles.ellipse1}></View>
        <View style={styles.ellipse2}></View>
      </View>

      <Text style={styles.sectionTitle}>Tasks List</Text>
      <Text style={styles.currentDate}>{selectedDate}</Text>

      <View style={styles.tasksList}>
        <Text style={styles.taskText}>Today's Tasks</Text>
        {(activities[selectedDate] || []).map((activity, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskDescription}>{activity.task}</Text>
            <Text style={styles.taskTime}>
              {activity.timeFrom} - {activity.timeTo}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus-circle" size={24} color="#2D8F95" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => navigation.navigate("CalendarScreen")}
      >
        <Icon name="calendar" size={24} color="#2D8F95" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter Activity"
              value={newActivity}
              onChangeText={setNewActivity}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={showTimeFromPicker}>
              <TextInput
                placeholder="Time From"
                value={timeFrom}
                editable={false}
                style={styles.textInput}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimeToPicker}>
              <TextInput
                placeholder="Time To"
                value={timeTo}
                editable={false}
                style={styles.textInput}
              />
            </TouchableOpacity>
            <Button title="Add" onPress={addActivity} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <DateTimePicker
        isVisible={isTimeFromPickerVisible}
        mode="time"
        onConfirm={handleTimeFromConfirm}
        onCancel={hideTimeFromPicker}
      />
      <DateTimePicker
        isVisible={isTimeToPickerVisible}
        mode="time"
        onConfirm={handleTimeToConfirm}
        onCancel={hideTimeToPicker}
      />
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
    width: "100%",
    height: 300,
    backgroundColor: "#F6F6F6",
  },
  backgroundRectangle: {
    position: "absolute",
    width: "100%",
    height: 307,
    left: 0,
    top: 0,
    backgroundColor: "#6AE08B",
    justifyContent: "center",
    alignItems: "center",
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#2B8E94",
    marginTop: 50,
  },
  welcomeText: {
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 0.06,
    color: "#FFFFFF",
    fontFamily: "Poppins",
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 20,
    textAlign: "left",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Poppins",
    paddingHorizontal: 20,
  },
  currentDate: {
    textAlign: "left",
    fontSize: 16,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Poppins",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tasksList: {
    margin: 20,
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
    padding: 15,
  },
  taskText: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  taskItem: {
    marginBottom: 10,
  },
  taskDescription: {
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Poppins",
  },
  taskTime: {
    fontSize: 12,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Poppins",
  },
  addButton: {
    position: "absolute",
    bottom: 50,
    right: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  calendarButton: {
    position: "absolute",
    bottom: 50,
    right: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
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
