import { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Alert,
} from 'react-native';

export default function NumberGame() {
	const [secret, setSecret] = useState(null);
	const [guess, setGuess] = useState('');
	const [message, setMessage] = useState('Guess number between 1-100');
	const [attempts, setAttempts] = useState(0);

	const resetGame = () => {
		setSecret(Math.floor(Math.random() * 100) + 1);
		setGuess('');
		setAttempts(0);
		setMessage('Guess number between 1-100');
	};

	useEffect(() => {
    resetGame();
	}, []);

	const makeGuess = () => {
		const n = parseInt(guess);

		if (isNaN(n) || n < 1 || n > 100) {
			setMessage('Please enter a number between 1 and 100');
			return;
		}

		const nextAttempts = attempts + 1;
		setAttempts(nextAttempts);

		if (n === secret) {
			Alert.alert('Correct',`You guessed the number in ${nextAttempts} guesses.`,
				[{ text: 'OK', onPress: resetGame }]
			);
		} else if (n < secret) {
			setMessage(`Your ${n} guess is too low`);
		} else {
			setMessage(`You ${n} guess is too high`);
		}

		setGuess('');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{message}</Text>

			<TextInput
				style={styles.input}
				value={guess}
				onChangeText={setGuess}
				keyboardType="numeric"
				placeholder="Enter your guess"
				returnKeyType="done"
			/>

			<View style={styles.buttonWrap}>
				<Button title="Make Guess" onPress={makeGuess} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		alignItems: 'stretch',
	},
	title: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 12,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 6,
		padding: 10,
		fontSize: 16,
		marginBottom: 12,
	},
	buttonWrap: {
		marginBottom: 12,
	},
	attempts: {
		textAlign: 'center',
		fontSize: 16,
	},
});
