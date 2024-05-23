import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../../constants';

const UpdateServices = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title: initialTitle, price: initialPrice, imageUrl: initialImageUrl } = route.params;

  const [title, setTitle] = useState(initialTitle);
  const [price, setPrice] = useState(initialPrice.toString());
  const [imageUri, setImageUri] = useState(initialImageUrl);

  const ref = firestore().collection('services').doc(id);

  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleUpdate = async () => {
    let newImageUrl = imageUri;

    if (imageUri !== initialImageUrl) {
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
      const storageRef = storage().ref(filename);
      const task = storageRef.putFile(uploadUri);

      try {
        await task;
        newImageUrl = await storageRef.getDownloadURL();
      } catch (e) {
        console.error(e);
        Alert.alert("Error", "Failed to upload image. Please try again.");
        return;
      }
    }

    try {
      await ref.update({
        title,
        price: parseFloat(price),
        imageUrl: newImageUrl,
        finalUpdate: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert("Updated", "Service updated successfully.");
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to update service. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service Name:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter Service Name"
        style={styles.input}
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Enter Price"
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
  },
  input: {
    height: 40,
    borderColor: COLORS.black,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  selectImageButton: {
    backgroundColor: COLORS.pink,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    resizeMode: 'cover',
  },
});

export default UpdateServices;
