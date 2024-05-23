import React, { useState } from "react";
import { Alert, View, Platform, StyleSheet } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import COLORS from "../../constants";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  const hasErrorName = () => name.trim() === "";
  const hasErrorEmail = () => !emailRegex.test(email);
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => passwordConfirm !== password;
  const hasErrorAddress = () => address.trim() === "";
  const hasErrorPhone = () => !phoneRegex.test(phone);

  const USERS = firestore().collection("USERS");

  const handleCreateAccount = () => {
    if (
      hasErrorName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      hasErrorAddress() ||
      hasErrorPhone()
    ) {
      Alert.alert("Please correct the errors before proceeding.");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        USERS.doc(email).set({
          name,
          email,
          address,
          password,
          phone,
          role: "customer",
        });
        navigation.navigate("Login");
        Alert.alert("Registered successfully");
      })
      .catch((error) => {
        const errorMessage =
          error.code === "auth/email-already-in-use"
            ? "Email is already in use"
            : "An error occurred during registration";
        Alert.alert(errorMessage);
      });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={Platform.select({ android: 100, ios: 0 })}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create New Account</Text>

        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <HelperText type="error" visible={hasErrorName()}>
          Full name cannot be empty
        </HelperText>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <HelperText type="error" visible={hasErrorEmail()}>
          Invalid email address
        </HelperText>

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <HelperText type="error" visible={hasErrorPassword()}>
          Password must be at least 6 characters
        </HelperText>

        <TextInput
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry={!showPasswordConfirm}
          style={styles.input}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() =>
                setShowPasswordConfirm(!showPasswordConfirm)
              }
            />
          }
        />
        <HelperText type="error" visible={hasErrorPasswordConfirm()}>
          Passwords do not match
        </HelperText>

        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <HelperText type="error" visible={hasErrorAddress()}>
          Address cannot be empty
        </HelperText>

        <TextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
        <HelperText type="error" visible={hasErrorPhone()}>
          Invalid phone number
        </HelperText>

        <Button
          mode="contained"
          onPress={handleCreateAccount}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.lightGray,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFCC66",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#FFCC66",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Register;
