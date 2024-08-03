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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { updateUserDetails } from "../services/api";
import Colors from "../Shared/Colors";

const EditProfileModal = ({ visible, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [image, setImage] = useState(null);

  const handleImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const localUri = result.assets[0].uri;
        const filename = localUri.split("/").pop();
        const newPath = FileSystem.documentDirectory + filename;

        await FileSystem.copyAsync({
          from: localUri,
          to: newPath,
        });

        setImage(newPath);
        setEditedUser({ ...editedUser, profileImage: newPath });
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSave = async () => {
    try {
      await updateUserDetails(editedUser);
      onSave(editedUser);
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
            {editedUser.profileImage && (
              <Image
                source={{ uri: editedUser.profileImage }}
                style={styles.profileImage}
              />
            )}
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
              style={[styles.button, { backgroundColor: Colors.orange }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.primary }]}
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
    backgroundColor: Colors.shadow,
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
    borderColor: Colors.primary,
    alignSelf: "center",
  },
  input: {
    backgroundColor: Colors.white,
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
