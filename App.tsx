import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Contact from './components/Contact';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Contact />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

