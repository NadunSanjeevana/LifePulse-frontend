import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Asset } from "expo-asset";
import EditProfileModal from "../modal/EditProfileModal"; // Adjust the path as per your project structure
import { getUserProfile } from "../services/api"; // Adjust the path as necessary
import { AuthContext } from "../Context/AuthContext";
import { AppGradient } from "../Components/AppGradient";

const ProfileScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (editedUser) => {
    setUser(editedUser);
    setIsEditing(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#28A745" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const badge1Uri = Asset.fromModule(
    require("../Assets/Images/badge1.png")
  ).uri;
  const badge2Uri = Asset.fromModule(
    require("../Assets/Images/badge2.png")
  ).uri;
  const badge3Uri = Asset.fromModule(
    require("../Assets/Images/badge3.png")
  ).uri;

  return (
    <AppGradient>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleEdit}>
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.profession}>{user.profession}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          <Text style={styles.location}>{user.location}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Work-Life Balance Tips</Text>
          <View style={styles.tipBox}>
            <Icon name="leaf" size={20} color="#28A745" />
            <Text style={styles.tipText}>
              Take regular breaks during work hours.
            </Text>
          </View>
          <View style={styles.tipBox}>
            <Icon name="clock-o" size={20} color="#28A745" />
            <Text style={styles.tipText}>
              Set clear boundaries between work and personal time.
            </Text>
          </View>
          <View style={styles.tipBox}>
            <Icon name="medkit" size={20} color="#28A745" />
            <Text style={styles.tipText}>
              Practice mindfulness and relaxation techniques.
            </Text>
          </View>
        </View>
        <View style={styles.badgesContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.badge}>
            <Image source={{ uri: badge1Uri }} style={styles.badgeImage} />
            <Text style={styles.badgeText}>Work-Life Balance Novice</Text>
          </View>
          <View style={styles.badge}>
            <Image source={{ uri: badge2Uri }} style={styles.badgeImage} />
            <Text style={styles.badgeText}>Work-Life Balance Intermediate</Text>
          </View>
          <View style={styles.badge}>
            <Image source={{ uri: badge3Uri }} style={styles.badgeImage} />
            <Text style={styles.badgeText}>Work-Life Balance Expert</Text>
          </View>
        </View>

        <EditProfileModal
          visible={isEditing}
          onClose={() => setIsEditing(false)}
          user={user}
          onSave={handleSave}
        />
      </ScrollView>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
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
    borderWidth: 2,
    borderColor: "#28A745",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#28A745",
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
    color: "#666666",
  },
  location: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  tipsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#28A745",
  },
  tipBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tipText: {
    marginLeft: 10,
    color: "#333333",
  },
  badgesContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  badgeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 16,
    color: "#333333",
  },
});

export default ProfileScreen;
