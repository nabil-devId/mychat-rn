import React, { useState, useEffect } from "react";
import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth, db, adminAuth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { HomeScreenProps } from "../../NavigationTypes";

interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [chats, setChats] = useState<Chat[]>([]);

  // Fetch chats the current user is a part of
  useEffect(() => {
    const q = query(collection(db, "chats"), where("participants", "array-contains", auth.currentUser?.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedChats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(loadedChats);

      setChats(loadedChats);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((error) => Alert.alert("Logout Error", error.message));
  };

  const createNewChat = async () => {
    try {
      let otherUserId = "PKdgnIymmVNC982nwFBZWsjZbfz2";
      if (auth.currentUser?.uid === "PKdgnIymmVNC982nwFBZWsjZbfz2") {
        otherUserId = "FHjyeDY5A9Vj3RS03dTizEo9r0a2";
      }

      const newChat = {
        participants: [auth.currentUser?.uid, otherUserId],
        lastMessage: "Chat created.",
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "chats"), newChat);
      navigation.navigate("Chat", { chatId: docRef.id });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Logout' onPress={handleLogout} />
      <Button title='Create New Chat' onPress={createNewChat} />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate("Chat", { chatId: item.id })}>
            <Text style={styles.lastMessage}>Last Message: {item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  chatItem: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  lastMessage: { color: "gray" },
});
