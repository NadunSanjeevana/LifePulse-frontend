import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  Platform,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";
import Icon from "react-native-vector-icons/FontAwesome";
import ActivityModal from "../modal/ActivityModal";
import {
  createTask,
  getTasksForDate,
  importCalendarEvents,
  deleteTask,
} from "../services/api";
import ChatBotButton from "../Components/ChatBotButton";
import { AppGradient } from "../Components/AppGradient";
import Colors from "../Shared/Colors";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [activities, setActivities] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    fetchTasks(formattedDate);
  }, []);

  const fetchTasks = async (date) => {
    try {
      const tasksForDate = await getTasksForDate(date);
      console.log("Tasks for date:", tasksForDate);
      setActivities({ [date]: tasksForDate });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
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
      const savedActivity = await createTask(newEntry);
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

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks(selectedDate);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const confirmDeleteTask = (taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteTask(taskId) },
      ],
      { cancelable: true }
    );
  };

  const imageUri = Asset.fromModule(require("../Assets/Images/home.png")).uri;

  return (
    <AppGradient>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.dashboard}
          resizeMode="cover"
        >
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
        </ImageBackground>

        <Text style={styles.sectionTitle}>Tasks List</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.currentDate}>{selectedDate}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CalendarScreen")}
          >
            <Icon
              name="calendar"
              size={24}
              color={Colors.primary}
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
              <TouchableOpacity
                onPress={() => confirmDeleteTask(activity.id)}
                style={styles.deleteButton}
              >
                <Icon name="trash" size={20} color="#FF6347" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus-circle" size={24} color={Colors.primary} />
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
  },
  dashboard: {
    position: "relative",
    width: "100%",
    height: 300,
    opacity: 0.9,
  },
  backgroundRectangle: {
    position: "absolute",
    width: "100%",
    height: 307,
    left: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: Colors.shadow,
    marginTop: 50,
  },
  welcomeText: {
    fontWeight: "600",
    fontSize: 24,
    color: Colors.primary,
    textAlign: "center",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  currentDate: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  calendarIcon: {
    marginRight: 10,
  },
  tasksList: {
    paddingHorizontal: 20,
  },
  taskText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.shadow,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskDescription: {
    fontSize: 16,
    color: Colors.primary,
    width: "60%",
  },
  taskTime: {
    fontSize: 14,
    color: Colors.primary,
    width: "25%",
  },
  deleteButton: {
    padding: 5,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  addButton: {
    padding: 10,
    color: Colors.primary,
  },
});

export default HomeScreen;
