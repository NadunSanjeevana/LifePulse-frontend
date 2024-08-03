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

import { AuthContext } from "../Context/AuthContext";
import { getTasksForDate, createTask } from "../services/api";
import ActivityModal from "../modal/ActivityModal"; // Adjust the path as per your project structure
import { AppGradient } from "../Components/AppGradient";
import Colors from "../Shared/Colors";

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

  const addActivity = async (newActivity, timeFrom, timeTo, category) => {
    const newEntry = {
      task: newActivity,
      category,
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
  // const isTodayOrFutureDate = (date) => {
  //   const today = new Date().setHours(0, 0, 0, 0); // Today's date without time
  //   const selected = new Date(date).setHours(0, 0, 0, 0); // Selected date without time
  //   return selected >= today;
  // };

  return (
    <AppGradient>
      <ScrollView style={styles.container}>
        <SearchBar />

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedDotColor: Colors.shadow,
            },
          }}
          theme={{
            textSectionTitleColor: Colors.primary,
            selectedDayTextColor: Colors.white,
            todayTextColor: Colors.orange,
            dayTextColor: Colors.primary,
            textDisabledColor: Colors.shadow,
            dotColor: Colors.shadow,
            selectedDotColor: Colors.orange,
            arrowColor: Colors.primary,
            monthTextColor: Colors.primary,
            textDayFontFamily: "Roboto",
            textMonthFontFamily: "Roboto",
            textDayHeaderFontFamily: "Roboto",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />

        <View style={styles.activityContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </View>

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
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  activityContainer: {
    marginTop: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.shadow,
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 16,
    color: Colors.primary,
  },
  noActivitiesText: {
    fontSize: 16,
    color: Colors.shadow,
  },
  addButton: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default CalendarScreen;
