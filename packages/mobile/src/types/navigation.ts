export type RootStackParamList = {
  Activation: undefined;
  MainTabs: undefined;
  Chat: { threadId?: string };
  Conversations: undefined;
  Profile: undefined;
  Journal: undefined;
  Settings: undefined;
  Resources: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Conversations: undefined;
  Journal: undefined;
  Profile: undefined;
};

export type ChatStackParamList = {
  ChatMain: undefined;
  VoiceDetail: { voiceId: string; voiceName: string };
};

export type JournalStackParamList = {
  JournalList: undefined;
  JournalEntry: { entryId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Council: undefined;
  Settings: undefined;
  Resources: undefined;
};
