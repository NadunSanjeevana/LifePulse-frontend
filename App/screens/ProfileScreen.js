import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = () => {
  // Placeholder user data
  const [user, setUser] = useState({
    name: "Jane Doe",
    username: "@janedoe",
    bio: "Software Developer | UI/UX Designer",
    location: "New York, USA",
    followers: 1500,
    following: 200,
    profession: "Software Developer",
    profileImage: require("../Assets/Images/login.png"), // Replace with actual image path
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.assets && response.assets.length > 0) {
        setUser({ ...user, profileImage: { uri: response.assets[0].uri } });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={user.profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={user.profession}
              onChangeText={(text) => setUser({ ...user, profession: text })}
              placeholder="Profession"
            />
            <TextInput
              style={styles.input}
              value={user.bio}
              onChangeText={(text) => setUser({ ...user, bio: text })}
              placeholder="Bio"
            />
            <TextInput
              style={styles.input}
              value={user.location}
              onChangeText={(text) => setUser({ ...user, location: text })}
              placeholder="Location"
            />
            <Button title="Save" onPress={handleSave} />
          </>
        ) : (
          <>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.profession}>{user.profession}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <Text style={styles.location}>{user.location}</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profession: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#666666",
  },
});

export default ProfileScreen;
