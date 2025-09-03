import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types/navigation';

// Import tab screens
import HomeScreen from './HomeScreen';
import ConversationsScreen from './ConversationsScreen';
import JournalScreen from './JournalScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Conversations') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Journal') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#E5E4E2',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#E5E4E2',
          borderTopWidth: 0.5,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '300',
          letterSpacing: 0.5,
        },
        headerStyle: {
          backgroundColor: '#0a0a0a',
          borderBottomColor: '#E5E4E2',
          borderBottomWidth: 0.5,
        },
        headerTintColor: '#D4AF37',
        headerTitleStyle: {
          fontWeight: '300',
          letterSpacing: 1,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Home',
          headerTitle: 'Pentara'
        }}
      />
      <Tab.Screen 
        name="Conversations" 
        component={ConversationsScreen}
        options={{ 
          title: 'Council',
          headerTitle: 'Your Council'
        }}
      />
      <Tab.Screen 
        name="Journal" 
        component={JournalScreen}
        options={{ 
          title: 'Journal',
          headerTitle: 'Journal'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profile',
          headerTitle: 'Your Profile'
        }}
      />
    </Tab.Navigator>
  );
}
