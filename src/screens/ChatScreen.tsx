// screens/ChatScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat"; // Import IMessage type
import { db, auth } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ChatScreenProps } from "../../NavigationTypes"; // Import our types

const ChatScreen = ({ route }: ChatScreenProps) => {
  // Use the prop type here
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { chatId } = route.params; // `chatId` is now type-safe

  useEffect(() => {
    const messagesQuery = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const loadedMessages = querySnapshot.docs.map((doc) => {
        const firebaseData = doc.data();
        const data: IMessage = {
          // Create a strongly-typed message object
          _id: doc.id,
          text: firebaseData.text,
          createdAt: (firebaseData.createdAt as Timestamp).toDate(), // Cast to Timestamp
          user: firebaseData.user,
        };
        return data;
      });
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      console.log("tesss");

      const messageToSend = messages[0];
      addDoc(collection(db, "chats", chatId, "messages"), {
        ...messageToSend,
        createdAt: new Date(), // Use JS Date for sending
      });

      updateDoc(doc(db, "chats", chatId), {
        lastMessage: messageToSend.text,
        createdAt: new Date(),
      });
    },
    [chatId]
  );

  if (!auth.currentUser) {
    return null; // Don't render if user is not logged in
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.uid,
      }}
    />
  );
};

export default ChatScreen;
