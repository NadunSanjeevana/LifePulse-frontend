import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileScreen = () => {
  // Placeholder user data
  const user = {
    name: "Jane Doe",
    username: "@janedoe",
    bio: "Software Developer | UI/UX Designer",
    location: "New York, USA",
    followers: 1500,
    following: 200,
    profileImage: require("../Assets/Images/login.png"), // Replace with actual image path
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <Text style={styles.location}>{user.location}</Text>
        <View style={styles.followContainer}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
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
  username: {
    fontSize: 16,
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
  followContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: "#FF1493",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  messageButtonText: {
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
