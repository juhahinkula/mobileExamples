import { openDatabaseSync } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { styles } from '../styles';

const db = openDatabaseSync('coursedb');

const initialize = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY NOT NULL, credits INT, title TEXT);
    `);
  } catch (error) {
    console.error('Could not open database', error);
  }
}

type Course = {
  id: number,
  title: string,
  credits: string
}

export default function Sqlite() {
  const [course, setCourse] = useState<Course>({} as Course);
  const [courses, setCourses] = useState<Course[]>([]);
  
  useDrizzleStudio(db);  
 
  useEffect(() => {
    initialize();
    updateList();
  }, []);

  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO course (title, credits) VALUES (?, ?)', course.title, course.credits);
      updateList();
      setCourse({} as Course);
    } catch (error) {
      console.error('Could not add item', error);
    }
  }

  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from course');
      setCourses(list as Course[]);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }

  const deleteItem = async (id: number) => {
    try {
      await db.runAsync('DELETE FROM course WHERE id=?', id);
      updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
          placeholder='Title'
          style={styles.textInput}
          onChangeText={text => setCourse({ ...course, title: text })}
          value={course.title} />
        <TextInput
          placeholder='Credits'
          style={styles.textInput}
          keyboardType='numeric'
          onChangeText={text => setCourse({ ...course, credits: text })}
          value={course.credits} />
        <Button onPress={saveItem} title="Save" />
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.listView}>
              <Text style={styles.listText}>{item.title}</Text>
              <Text style={styles.listText}>{item.credits} </Text>
              <Text style={{ color: '#ff0000', fontSize: 18 }} onPress={() => deleteItem(item.id)}>
                Delete
              </Text>
            </View>
          }
          data={courses}
        />
    </View>
  );
}