import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { importCalendarEvents, saveSelectedEvents } from "../services/api"; // Adjust the path as needed
import { AppGradient } from "../Components/AppGradient";
import Colors from "../Shared/Colors";

const { width, height } = Dimensions.get("window");

const UploadScreen = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const categories = [
    { label: "Work", value: "Work" },
    { label: "Leisure", value: "Leisure" },
    { label: "Sleep", value: "Sleep" },
    { label: "Other", value: "Other" },
  ];

  useFocusEffect(
    useCallback(() => {
      // Reset the state when the screen is focused
      setEvents([]);
      setSelectedEvents([]);
      setAllSelected(false);
    }, [])
  );

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        const parsedEvents = await importCalendarEvents(uri);
        // Add a default category to each event
        const eventsWithCategories = parsedEvents.map((event) => ({
          ...event,
          category: "Other",
        }));
        setEvents(eventsWithCategories);
      }
    } catch (error) {
      console.error("Failed to upload calendar file:", error);
      Alert.alert("Error", "Failed to upload calendar file");
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events);
    }
    setAllSelected(!allSelected);
  };

  const handleCategoryChange = (event, category) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) => (e === event ? { ...e, category } : e))
    );
  };

  const handleImportEvents = async () => {
    try {
      await saveSelectedEvents(selectedEvents);
      Alert.alert("Success", "Events imported successfully");
    } catch (error) {
      console.error("Failed to import events:", error);
      Alert.alert("Error", "Failed to import events");
    }
  };
  const imageUri = Asset.fromModule(
    require("../Assets/Images/calender1.png")
  ).uri;

  return (
    <AppGradient>
      <View style={styles.container}>
        {events.length === 0 && (
          <View style={styles.centeredContainer}>
            <Image
              source={{ uri: imageUri }} // Adjust the path as needed
              style={styles.image}
            />
            <View style={styles.centeredButtonContainer}>
              <Button
                title="Upload Calendar File"
                onPress={handleFileUpload}
                color={Colors.orange}
              />
            </View>
          </View>
        )}
        {events.length > 0 && (
          <>
            <View style={styles.topButtonContainer}>
              <Button
                title="Upload Calendar File"
                onPress={handleFileUpload}
                color={Colors.orange}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={allSelected ? "Deselect All" : "Select All"}
                onPress={handleSelectAll}
                color={Colors.orange}
              />
            </View>
            <FlatList
              data={events}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleEventSelect(item)}
                  style={[
                    styles.eventItem,
                    selectedEvents.includes(item) && styles.selectedEvent,
                  ]}
                >
                  <Text style={styles.eventText}>{item.summary}</Text>
                  <Text style={styles.eventText}>
                    {new Date(item.start).toLocaleString()}
                  </Text>
                  <Text style={styles.eventText}>
                    {new Date(item.end).toLocaleString()}
                  </Text>
                  <Picker
                    selectedValue={item.category}
                    onValueChange={(value) => handleCategoryChange(item, value)}
                    style={styles.picker}
                  >
                    {categories.map((category) => (
                      <Picker.Item
                        key={category.value}
                        label={category.label}
                        value={category.value}
                      />
                    ))}
                  </Picker>
                </TouchableOpacity>
              )}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Import Selected Events"
                onPress={handleImportEvents}
                color={Colors.orange}
              />
            </View>
          </>
        )}
      </View>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : 30,
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredButtonContainer: {
    marginTop: 20,
  },
  topButtonContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer: {
    padding: 10,
  },
  eventItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderColor: Colors.shadow,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedEvent: {
    backgroundColor: Colors.shadow,
  },
  picker: {
    height: 50,
    width: 150,
    marginTop: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.shadow,
    borderWidth: 1,
    borderRadius: 5,
  },
  eventText: {
    color: Colors.black,
  },
  image: {
    width: width,
    height: height * 0.5,
    marginBottom: 10,
  },
});

export default UploadScreen;
