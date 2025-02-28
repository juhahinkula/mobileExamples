import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, Pressable, View, Modal, Image } from 'react-native';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [picture, setPicture] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef) {
      const pic = await cameraRef.current?.takePictureAsync();
      setPicture(pic?.uri || '');
      console.log("Picture taken: " + pic?.uri);
    }
  }

  const showImage = async () => {
    setIsVisible(true);
    console.log(picture);
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={showImage}>
            <Text style={styles.text}>Show Picture</Text>
          </Pressable>
        </View>
      </CameraView>
      <Modal visible={isVisible} animationType='slide'>
        <View style={styles.container}>
          <Image source={{ uri: picture }} style={{ width: '90%', height: '90%' }} />
          <Button title="Close" onPress={() => setIsVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
