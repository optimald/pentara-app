import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Profile, CouncilMember } from '../types';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // TODO: Load from secure storage
    // For now, using mock data
    setTimeout(() => {
      setProfile({
        id: 'profile1',
        userId: 'user1',
        personalManual: 'Your personal manual content would be here...',
        warriorName: 'Sage of the Digital Realm',
        council: [
          {
            id: 'marcus',
            name: 'Marcus Aurelius',
            title: 'Stoic Emperor & Philosopher',
            specialty: 'Leadership & Self-Discipline',
            description: 'Focus on rational decision-making, inner strength, and principled leadership',
            avatar: '👑',
            systemPrompt: 'You are Marcus Aurelius...',
            tokenCap: 140,
          },
          {
            id: 'maya',
            name: 'Maya Angelou',
            title: 'Poet & Civil Rights Activist',
            specialty: 'Communication & Resilience',
            description: 'Emphasizes authentic voice, courage, and graceful communication',
            avatar: '✍️',
            systemPrompt: 'You are Maya Angelou...',
            tokenCap: 140,
          },
          {
            id: 'steve',
            name: 'Steve Jobs',
            title: 'Visionary Entrepreneur',
            specialty: 'Innovation & Vision',
            description: 'Challenges conventional thinking, pursues excellence, focuses on vision',
            avatar: '💡',
            systemPrompt: 'You are Steve Jobs...',
            tokenCap: 140,
          },
          {
            id: 'oprah',
            name: 'Oprah Winfrey',
            title: 'Media Mogul & Philanthropist',
            specialty: 'Empathy & Growth',
            description: 'Encourages self-reflection, meaningful connections, and personal growth',
            avatar: '🌟',
            systemPrompt: 'You are Oprah Winfrey...',
            tokenCap: 140,
          },
          {
            id: 'leonardo',
            name: 'Leonardo da Vinci',
            title: 'Renaissance Master',
            specialty: 'Creativity & Learning',
            description: 'Inspires curiosity, creative problem-solving, and lifelong learning',
            avatar: '🎨',
            systemPrompt: 'You are Leonardo da Vinci...',
            tokenCap: 140,
          },
        ],
        encryptedData: 'encrypted_data_here',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleRequestVoiceSwap = (voiceId: string, voiceName: string) => {
    Alert.alert(
      'Request Voice Swap',
      `Would you like to request a different voice to replace ${voiceName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Request',
          onPress: () => {
            // TODO: Implement voice swap request
            Alert.alert('Request Sent', 'Your voice swap request has been sent to your onboarding specialist.');
          },
        },
      ]
    );
  };

  const handleViewPersonalManual = () => {
    Alert.alert(
      'Personal Manual',
      'View your complete personal manual?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'View',
          onPress: () => {
            // TODO: Navigate to full personal manual view
            Alert.alert('Personal Manual', 'Full personal manual view coming soon!');
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Warrior Name Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Warrior Name</Text>
        <View style={styles.warriorNameCard}>
          <Text style={styles.warriorName}>{profile.warriorName}</Text>
          <Text style={styles.warriorNameSubtitle}>
            Your identity as recognized by your council
          </Text>
        </View>
      </View>

      {/* Personal Manual Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Manual</Text>
        <TouchableOpacity style={styles.manualCard} onPress={handleViewPersonalManual}>
          <View style={styles.manualHeader}>
            <Ionicons name="book" size={20} color="#D4AF37" />
            <Text style={styles.manualTitle}>View Complete Manual</Text>
          </View>
          <Text style={styles.manualPreview} numberOfLines={3}>
            {profile.personalManual}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Council Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Personal Council</Text>
        <Text style={styles.sectionSubtitle}>
          Your five trusted advisors, each with unique wisdom and perspective
        </Text>
        
        {profile.council.map((member) => (
          <View key={member.id} style={styles.councilMemberCard}>
            <View style={styles.memberHeader}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>{member.avatar}</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberTitle}>{member.title}</Text>
                <Text style={styles.memberSpecialty}>{member.specialty}</Text>
              </View>
              <TouchableOpacity
                style={styles.swapButton}
                onPress={() => handleRequestVoiceSwap(member.id, member.name)}
              >
                <Ionicons name="swap-horizontal-outline" size={16} color="#D4AF37" />
              </TouchableOpacity>
            </View>
            <Text style={styles.memberDescription}>{member.description}</Text>
          </View>
        ))}
      </View>

      {/* Profile Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created</Text>
            <Text style={styles.infoValue}>
              {profile.createdAt.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>
              {profile.updatedAt.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Council Members</Text>
            <Text style={styles.infoValue}>{profile.council.length}</Text>
          </View>
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#E5E4E2',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#E5E4E2',
    marginBottom: 8,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.7,
    marginBottom: 16,
    lineHeight: 20,
  },
  warriorNameCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignItems: 'center',
  },
  warriorName: {
    fontSize: 24,
    fontWeight: '300',
    color: '#D4AF37',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 8,
  },
  warriorNameSubtitle: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.7,
    textAlign: 'center',
  },
  manualCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  manualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  manualTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D4AF37',
    marginLeft: 8,
  },
  manualPreview: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.8,
    lineHeight: 20,
  },
  councilMemberCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    fontSize: 18,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E4E2',
    marginBottom: 2,
  },
  memberTitle: {
    fontSize: 12,
    color: '#D4AF37',
    marginBottom: 2,
  },
  memberSpecialty: {
    fontSize: 12,
    color: '#E5E4E2',
    opacity: 0.7,
  },
  swapButton: {
    padding: 8,
  },
  memberDescription: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.8,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E4E2',
  },
  infoLabel: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 14,
    color: '#E5E4E2',
    fontWeight: '500',
  },
});
