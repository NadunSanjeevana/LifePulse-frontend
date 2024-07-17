// ActivityModal.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SelectList } from "react-native-dropdown-select-list";

const ActivityModal = ({ modalVisible, setModalVisible, addActivity }) => {
  const [newActivity, setNewActivity] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [isTimeFromPickerVisible, setTimeFromPickerVisibility] =
    useState(false);
  const [isTimeToPickerVisible, setTimeToPickerVisibility] = useState(false);
  const [selected, setSelected] = React.useState("");

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
  const data = [
    { key: "1", value: "Leisure" },
    { key: "2", value: "Work" },
    { key: "3", value: "Other" },
  ];

  const handleAddActivity = () => {
    addActivity(newActivity, timeFrom, timeTo);
    setNewActivity("");
    setTimeFrom("");
    setTimeTo("");
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Enter Activity"
            value={newActivity}
            onChangeText={setNewActivity}
            style={styles.textInput}
          />
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            placeholder="Categories"
            style={styles.textInput}
          />

          <TouchableOpacity onPress={showTimeFromPicker}>
            <TextInput
              placeholder="Time From"
              value={timeFrom}
              editable={false}
              style={[styles.textInput, ,]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimeToPicker}>
            <TextInput
              placeholder="Time To"
              value={timeTo}
              editable={false}
              style={[styles.textInput, ,]}
            />
          </TouchableOpacity>
          <Button title="Add" onPress={handleAddActivity} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </View>

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
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 5,
  },
});

export default ActivityModal;
