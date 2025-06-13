import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Chat: { chatId: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;
