import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppSettings } from '../types';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    dailyReminders: true,
    reminderTime: '09:00',
    dataExport: false,
    privacyMode: false,
  });

  const handleToggleSetting = (key: keyof AppSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Export all your journal entries and chat history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => {
            // TODO: Implement data export
            Alert.alert('Export', 'Data export feature coming soon!');
          },
        },
      ]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your journal entries and chat history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Delete Confirmed', 'All data has been deleted.');
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Pentara',
      'Version 1.0.0\n\nPentara is your personal advisory council, providing guidance through the wisdom of historical figures.\n\nRemember: Pentara is not therapy. If you\'re in crisis, please contact emergency services.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive notifications for daily reminders
            </Text>
          </View>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => handleToggleSetting('notifications', value)}
            trackColor={{ false: '#E5E4E2', true: '#D4AF37' }}
            thumbColor={settings.notifications ? '#0a0a0a' : '#E5E4E2'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Daily Reminders</Text>
            <Text style={styles.settingDescription}>
              Get reminded to check in with your council
            </Text>
          </View>
          <Switch
            value={settings.dailyReminders}
            onValueChange={(value) => handleToggleSetting('dailyReminders', value)}
            trackColor={{ false: '#E5E4E2', true: '#D4AF37' }}
            thumbColor={settings.dailyReminders ? '#0a0a0a' : '#E5E4E2'}
          />
        </View>
      </View>

      {/* Privacy Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Privacy Mode</Text>
            <Text style={styles.settingDescription}>
              Hide sensitive content when app is backgrounded
            </Text>
          </View>
          <Switch
            value={settings.privacyMode}
            onValueChange={(value) => handleToggleSetting('privacyMode', value)}
            trackColor={{ false: '#E5E4E2', true: '#D4AF37' }}
            thumbColor={settings.privacyMode ? '#0a0a0a' : '#E5E4E2'}
          />
        </View>

        <TouchableOpacity style={styles.settingButton} onPress={handleExportData}>
          <View style={styles.settingButtonContent}>
            <Ionicons name="download-outline" size={20} color="#D4AF37" />
            <Text style={styles.settingButtonText}>Export Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#E5E4E2" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton} onPress={handleDeleteData}>
          <View style={styles.settingButtonContent}>
            <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
            <Text style={[styles.settingButtonText, { color: '#FF6B6B' }]}>Delete All Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#E5E4E2" />
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingButtonContent}>
            <Ionicons name="help-circle-outline" size={20} color="#D4AF37" />
            <Text style={styles.settingButtonText}>Help & FAQ</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#E5E4E2" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingButtonContent}>
            <Ionicons name="mail-outline" size={20} color="#D4AF37" />
            <Text style={styles.settingButtonText}>Contact Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#E5E4E2" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton} onPress={handleAbout}>
          <View style={styles.settingButtonContent}>
            <Ionicons name="information-circle-outline" size={20} color="#D4AF37" />
            <Text style={styles.settingButtonText}>About</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#E5E4E2" />
        </TouchableOpacity>
      </View>

      {/* Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        
        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingButtonContent}>
            <Ionicons name="document-text-outline" size={20} color="#D4AF37" />
            <Text style={styles.settingButtonText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#E5E4E2" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingButtonContent}>
            <Ionicons name="document-outline" size={20} color="#D4AF37" />
            <Text style={styles.settingButtonText}>Terms of Service</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#E5E4E2" />
        </TouchableOpacity>
      </View>

      {/* Crisis Resources */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.crisisButton}>
          <Ionicons name="medical" size={20} color="#E5E4E2" />
          <Text style={styles.crisisButtonText}>Crisis Resources</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#E5E4E2',
    marginBottom: 16,
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E4E2',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.7,
    lineHeight: 18,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  settingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingButtonText: {
    fontSize: 16,
    color: '#E5E4E2',
    marginLeft: 12,
  },
  crisisButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  crisisButtonText: {
    color: '#E5E4E2',
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 12,
  },
});
