import React,{useEffect} from "react";
import { StyleSheet,Text,View } from "react-native";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { MyContextControllerProvider} from "./src/context";
import Router from "./src/screens/Router"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import COLORS from "././constants"
import RouterServices from "./src/screens/RouterServices";

const initial = () => {
  const USERS = firestore().collection("USERS")
  const admin = {
    name: "admin",
    phone: "0123456789",
    address: "Binh Duong",
    email: "AnhTu080302@gmail.com",
    password: "123456",
    role: "admin"
  }
  USERS.doc(admin.email).onSnapshot(u => {
    if (!u.exists) {
      auth().createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() => {
          USERS.doc(admin.email).set(admin)
          console.log("Add new user admin!")
        })
    }
  })
}

const App = () => {
  useEffect(() => {
    initial()
  }, [])

  return (
    <PaperProvider>
    <MyContextControllerProvider>
      <NavigationContainer>
       <Router>
       </Router>
      </NavigationContainer>
    </MyContextControllerProvider>
  </PaperProvider>
  )
}

export default App
