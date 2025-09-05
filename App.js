import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './packages/mobile/src/components/ErrorBoundary';

// Import screens
import ActivationScreen from './packages/mobile/src/screens/ActivationScreen';
import MainTabsScreen from './packages/mobile/src/screens/MainTabsScreen';
import ChatScreen from './packages/mobile/src/screens/ChatScreen';
import ConversationsScreen from './packages/mobile/src/screens/ConversationsScreen';
import ProfileScreen from './packages/mobile/src/screens/ProfileScreen';
import JournalScreen from './packages/mobile/src/screens/JournalScreen';
import SettingsScreen from './packages/mobile/src/screens/SettingsScreen';
import ResourcesScreen from './packages/mobile/src/screens/ResourcesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#0a0a0a" />
          <Stack.Navigator
          initialRouteName="Activation"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0a0a0a',
              borderBottomColor: '#E5E4E2',
              borderBottomWidth: 0.5,
            },
            headerTintColor: '#D4AF37',
            headerTitleStyle: {
              fontFamily: 'System',
              fontWeight: '300',
              letterSpacing: 1,
            },
            cardStyle: {
              backgroundColor: '#0a0a0a',
            },
          }}
        >
          <Stack.Screen 
            name="Activation" 
            component={ActivationScreen}
            options={{ 
              title: 'Activate Pentara',
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabsScreen}
            options={{ 
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{ 
              title: 'Your Council',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Conversations" 
            component={ConversationsScreen}
            options={{ 
              title: 'Conversations',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ 
              title: 'Your Profile',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Journal" 
            component={JournalScreen}
            options={{ 
              title: 'Journal',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ 
              title: 'Settings',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Resources" 
            component={ResourcesScreen}
            options={{ 
              title: 'Resources',
              headerBackTitle: 'Back'
            }}
          />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}