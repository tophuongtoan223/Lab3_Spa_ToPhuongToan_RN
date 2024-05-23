import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Image, StyleSheet, Text } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController, logout } from '../context'; 
import COLORS from '../../constants';
import Service from '../context/services';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const [visible, setVisible] = useState(false);
  const ref = firestore().collection('services');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, price, imageUrl, createdAt, finalUpdate } = doc.data();
        list.push({
          id: doc.id,
          title,
          price,
          imageUrl,
          createdAt,
          finalUpdate,
        });
      });
      setServices(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#FFCC66" }} > 
        <Appbar.Content 
          title={`${userLogin ? userLogin.name : 'Guest'}`} 
          titleStyle={{ fontWeight: 'bold' }}
          color='white' 
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="account-circle" onPress={openMenu} color="white" />}
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate('Home');
              closeMenu();
            }}
            title="Home"
          />
          <Menu.Item
            onPress={() => {
              logout(dispatch, navigation); 
              closeMenu();
            }}
            title="Logout"
          />
        </Menu>
      </Appbar.Header>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../img/logolab3.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ fontWeight: "bold", color: COLORS.black, fontSize: 20 }}>Danh sách dịch vụ</Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Service {...item} />
        )}
      />
    </SafeAreaView>
  );
}

export default Admin;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
