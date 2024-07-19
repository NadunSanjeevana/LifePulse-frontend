import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Button as RNButton,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import expo-image-picker
import { updateUserDetails } from "../services/api"; // Adjust the path as necessary

const EditProfileModal = ({ visible, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [image, setImage] = useState(null); // State for the image

  const handleImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setImage(result.uri);
      if (!result.cancelled) {
        setEditedUser({ ...editedUser, profileImage: result.uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSave = async () => {
    try {
      // Call API to update user details
      await updateUserDetails(editedUser);
      onSave(editedUser); // Update local state after successful save
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleImagePicker}>
            {/* Display selected image */}
            {editedUser.profileImage && (
              <Image
                source={{ uri: editedUser.profileImage }}
                style={styles.profileImage}
              />
            )}
            {/* Display default image if none selected */}
            {!editedUser.profileImage && (
              <Image
                source={require("../Assets/Images/login.png")}
                style={styles.profileImage}
              />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={editedUser.name}
            onChangeText={(text) =>
              setEditedUser({ ...editedUser, name: text })
            }
            placeholder="Name"
            placeholderTextColor="#8E8E8E"
          />
          <TextInput
            style={styles.input}
            value={editedUser.profession}
            onChangeText={(text) =>
              setEditedUser({ ...editedUser, profession: text })
            }
            placeholder="Profession"
            placeholderTextColor="#8E8E8E"
          />
          <TextInput
            style={styles.input}
            value={editedUser.bio}
            onChangeText={(text) => setEditedUser({ ...editedUser, bio: text })}
            placeholder="Bio"
            placeholderTextColor="#8E8E8E"
          />
          <TextInput
            style={styles.input}
            value={editedUser.location}
            onChangeText={(text) =>
              setEditedUser({ ...editedUser, location: text })
            }
            placeholder="Location"
            placeholderTextColor="#8E8E8E"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#DC3545" }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#28A745" }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#28A745",
    alignSelf: "center",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default EditProfileModal;
