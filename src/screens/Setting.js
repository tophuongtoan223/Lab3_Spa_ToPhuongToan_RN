import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMyContextController, logout } from "../context";

const Setting = () => {
  const navigation = useNavigation();
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const handleLogout = () => {
    logout(dispatch, navigation);
  };

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button mode="contained" onPress={handleLogout} style={{backgroundColor:"#FFCC66"}}>
        Đăng xuất
      </Button>
    </View>
  );
};

export default Setting;
