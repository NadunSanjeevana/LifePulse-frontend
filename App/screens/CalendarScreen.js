import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import SearchBar from "../Components/SearchBar";
import Slider from "../Components/Slider";
import { AuthContext } from "../Context/AuthContext";
import { getTasksForDate, createTask } from "../services/api";
import ActivityModal from "../modal/ActivityModal"; // Adjust the path as per your project structure

const CalendarScreen = () => {
  const { userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchTasks(selectedDate);
    }
  }, [selectedDate]);

  const fetchTasks = async (date) => {
    try {
      const tasksForDate = await getTasksForDate(date);
      setTasks(tasksForDate);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle error (e.g., show error message)
    }
  };

  const addActivity = async (newActivity, timeFrom, timeTo) => {
    const newEntry = {
      task: newActivity,
      timeFrom,
      timeTo,
      date: selectedDate,
    };

    try {
      const savedActivity = await createTask(newEntry); // Save to backend
      const formattedActivity = {
        task: savedActivity.description,
        timeFrom: new Date(savedActivity.timeFrom).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timeTo: new Date(savedActivity.timeTo).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: selectedDate,
      };
      setTasks((prevTasks) => [...prevTasks, formattedActivity]); // Update tasks state
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  };

  // Function to check if the selected date is today or future
  const isTodayOrFutureDate = (date) => {
    const today = new Date().setHours(0, 0, 0, 0); // Today's date without time
    const selected = new Date(date).setHours(0, 0, 0, 0); // Selected date without time
    return selected >= today;
  };

  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <Slider />
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedDotColor: "#28A745",
          },
        }}
        theme={{
          calendarBackground: "#FFFFFF",
          textSectionTitleColor: "#28A745",
          selectedDayBackgroundColor: "#28A745",
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: "#28A745",
          dayTextColor: "#333333",
          textDisabledColor: "#d9e1e8",
          dotColor: "#28A745",
          selectedDotColor: "#FFFFFF",
          arrowColor: "#28A745",
          monthTextColor: "#28A745",
          textDayFontFamily: "Roboto",
          textMonthFontFamily: "Roboto",
          textDayHeaderFontFamily: "Roboto",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />
      {selectedDate && isTodayOrFutureDate(selectedDate) && (
        <View style={styles.activityContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Display fetched tasks */}
      <View style={styles.activityContainer}>
        <Text style={styles.dateText}>Tasks for {selectedDate}:</Text>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <View key={index} style={styles.taskContainer}>
              <Text style={styles.taskText}>{task.task}</Text>
              <Text style={styles.taskText}>
                {task.timeFrom} - {task.timeTo}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noActivitiesText}>
            No tasks scheduled for this date.
          </Text>
        )}
      </View>

      <ActivityModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addActivity={addActivity}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  activityContainer: {
    marginTop: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28A745",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#333333",
  },
  noActivitiesText: {
    fontSize: 16,
    color: "gray",
  },
  addButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CalendarScreen;
