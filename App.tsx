import { StatusBar } from 'expo-status-bar';
import Contact from './components/Contact';
import Sqlite from './components/Sqlite';
import Camera from './components/Camera';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

