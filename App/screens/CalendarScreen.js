import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import WelcomeHeader from "../Components/WelcomeHeader";
import SearchBar from "../Components/SearchBar";
import Slider from "../Components/Slider";
import { AuthContext } from "../Context/AuthContext";

const CalenderScreen = () => {
  const { userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [activities, setActivities] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  const addActivity = () => {
    setActivities({
      ...activities,
      [selectedDate]: [...(activities[selectedDate] || []), newActivity],
    });
    setNewActivity("");
    setModalVisible(false);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <SearchBar />
      <Slider />
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />
      <View style={styles.activityContainer}>
        <Text style={styles.dateText}>Activities for {selectedDate}:</Text>
        {activities[selectedDate]?.length > 0 ? (
          activities[selectedDate].map((activity, index) => (
            <Text key={index} style={styles.activityText}>
              {activity}
            </Text>
          ))
        ) : (
          <Text style={styles.noActivitiesText}>
            No activities for this date.
          </Text>
        )}
        <Button title="Add Activity" onPress={() => setModalVisible(true)} />
      </View>

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
  activityContainer: {
    marginTop: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activityText: {
    fontSize: 16,
  },
  noActivitiesText: {
    fontSize: 16,
    color: "gray",
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

export default CalenderScreen;
