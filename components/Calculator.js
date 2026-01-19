import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (operator) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    let res = 0;
    if (operator === '+') {
      res = numA + numB;
    } else if (operator === '-') {
      res = numA - numB;
    }   
    setResult(res);
  }

  return (
    <View style={styles.calcContainer}>
      <Text style={styles.result}>Result: {result !== null ? result : '-'}</Text>
      <TextInput
        style={styles.input}
        value={a}
        onChangeText={setA}
        keyboardType="numeric"
        placeholder="First number"
      />
      <TextInput
        style={styles.input}
        value={b}
        onChangeText={setB}
        keyboardType="numeric"
        placeholder="Second number"
      />
      <View style={styles.buttons}>
        <View style={styles.buttonWrap}>
          <Button title=" + " onPress={() => calculate("+")} />
        </View>
        <View style={styles.buttonWrap}>
          <Button title=" - " onPress={() => calculate("-")} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calcContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'stretch',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  buttonWrap: {
    flex: 1,
    marginHorizontal: 6,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
  },
});
