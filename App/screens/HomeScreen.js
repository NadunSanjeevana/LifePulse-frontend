import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import ActivityModal from "../modal/ActivityModal";
import {
  createTask,
  getTasksForDate,
  importCalendarEvents,
} from "../services/api";
import ChatBotButton from "../Components/ChatBotButton"; // Ensure the path is correct
import { AppGradient } from "../Components/AppGradient";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [activities, setActivities] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    setSelectedDate(formattedDate);
    fetchTasks(formattedDate); // Fetch tasks for today's date initially
  }, []);

  const fetchTasks = async (date) => {
    try {
      const tasksForDate = await getTasksForDate(date); // Fetch tasks for the selected date
      setActivities({ [date]: tasksForDate });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      // Handle error (e.g., show error message to the user)
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
      setActivities({
        ...activities,
        [selectedDate]: [
          ...(activities[selectedDate] || []),
          formattedActivity,
        ],
      });
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  };

  return (
    <AppGradient>
      <ScrollView style={styles.container}>
        <View style={styles.dashboard}>
          <ChatBotButton />

          <View style={styles.backgroundRectangle}>
            <Image
              source={user.profileImage ? { uri: user.profileImage } : null}
              style={styles.profileImage}
            />
            <Text style={styles.welcomeText}>
              Welcome {user ? user.userName : "Guest"}!
            </Text>
          </View>
          <View style={styles.shape}></View>
          <View style={styles.ellipse1}></View>
          <View style={styles.ellipse2}></View>
        </View>

        <Text style={styles.sectionTitle}>Tasks List</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.currentDate}>{selectedDate}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CalendarScreen")}
          >
            <Icon
              name="calendar"
              size={24}
              color="#2D8F95"
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>

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

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus-circle" size={24} color="#2D8F95" />
          </TouchableOpacity>
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
    // backgroundColor: "#F6F6F6",
  },
  dashboard: {
    position: "relative",
    width: "100%",
    height: 300,
    // backgroundColor: "#F6F6F6",
  },
  backgroundRectangle: {
    position: "absolute",
    width: "100%",
    height: 307,
    left: 0,
    top: 0,
    // backgroundColor: "#6AE08B",
    justifyContent: "center",
    alignItems: "center",
  },
  // shape: {
  //   position: "absolute",
  //   width: 290,
  //   height: 270,
  //   left: -99,
  //   top: -109,
  //   backgroundColor: "rgba(191, 218, 216, 0.49)",
  // },
  // ellipse1: {
  //   position: "absolute",
  //   width: "31.03%",
  //   height: "100%",
  //   left: 0,
  //   backgroundColor: "rgba(191, 218, 216, 0.49)",
  // },
  // ellipse2: {
  //   position: "absolute",
  //   width: "31.03%",
  //   height: "100%",
  //   right: 0,
  //   backgroundColor: "rgba(191, 218, 216, 0.49)",
  // },
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
    color: "#d3f9d8",
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 20,
    textAlign: "left",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 20,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  currentDate: {
    textAlign: "left",
    fontSize: 16,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
  },
  calendarIcon: {
    marginLeft: 10,
    backgroundColor: "#d3f9d8",
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
    marginLeft: 15,
  },
  tasksList: {
    margin: 20,
    backgroundColor: "#d3f9d8",
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
  },
  taskTime: {
    fontSize: 12,
    letterSpacing: 0.06,
    color: "rgba(0, 0, 0, 0.75)",
  },
  iconContainer: {
    position: "absolute",
    bottom: 50,
    right: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#d3f9d8",
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
    marginLeft: 15,
  },

  calendarButton: {
    backgroundColor: "#d3f9d8",
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
});

export default HomeScreen;
