import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Menu, Provider, Appbar } from 'react-native-paper';
import COLORS from '../../constants';

const parseTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return 'N/A';
  const date = timestamp.toDate();
  return date.toLocaleString();
};

const ServicesDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, price, imageUrl, createdAt, finalUpdate, id } = route.params;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDelete = () => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteService() },
      ]
    );
  };

  const deleteService = () => {
    firestore().collection('services').doc(id).delete();
    console.log('Service deleted:', id);
    navigation.goBack();
  };

  console.log('Route Params:', route.params);

  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: "#FFCC66" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={COLORS.white} />
        <Appbar.Content title="Service Details" color={COLORS.white} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        >
          <Menu.Item onPress={handleDelete} title="Delete" />
        </Menu>
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Service name: <Text style={styles.textNormal}>{title || 'N/A'}</Text>
          </Text>
        </View>
        <Text style={styles.title}>
          Price: <Text style={styles.textNormal}>{price ? `${price} ₫` : 'N/A'}</Text>
        </Text>
        <Text style={styles.title}>
          Time: <Text style={styles.textNormal}>{parseTimestamp(createdAt)}</Text>
        </Text>
        <Text style={styles.title}>
          Final update: <Text style={styles.textNormal}>{parseTimestamp(finalUpdate)}</Text>
        </Text>
        {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  textNormal: {
    fontWeight: 'normal',
  },
});

export default ServicesDetail;
