import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { importCalendarEvents, saveSelectedEvents } from "../services/api"; // Adjust the path as needed
import { AppGradient } from "../Components/AppGradient";

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

  return (
    <AppGradient>
      <View style={styles.container}>
        <Button
          title="Upload Calendar File"
          onPress={handleFileUpload}
          color="#4CAF50"
        />
        {events.length > 0 && (
          <>
            <Button
              title={allSelected ? "Deselect All" : "Select All"}
              onPress={handleSelectAll}
              color="#4CAF50"
            />
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
                  <Text>{item.summary}</Text>
                  <Text>{new Date(item.start).toLocaleString()}</Text>
                  <Text>{new Date(item.end).toLocaleString()}</Text>
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
            <Button
              title="Import Selected Events"
              onPress={handleImportEvents}
              color="#4CAF50"
            />
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
  eventItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedEvent: {
    backgroundColor: "#d3f9d8",
  },
  picker: {
    height: 50,
    width: 150,
    marginTop: 10,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default UploadScreen;
