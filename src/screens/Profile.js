import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useMyContextController, logout } from "../context";

const Profile = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const handleLogout = () => {
    logout(dispatch, navigation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userLogin ? userLogin.email : "Unknown"}</Text>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{userLogin ? userLogin.role : "Unknown"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background for contrast
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFCC66",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff3366",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Profile;
