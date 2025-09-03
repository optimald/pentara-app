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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { getUsageStats, checkSubscription } from '../services/api';
import { UsageStats } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [subscriptionActive, setSubscriptionActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [stats, subscription] = await Promise.all([
        getUsageStats(),
        checkSubscription(),
      ]);
      setUsageStats(stats);
      setSubscriptionActive(subscription.active);
    } catch (error) {
      console.error('Failed to load home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickChat = () => {
    navigation.navigate('Conversations');
  };

  const handleViewJournal = () => {
    navigation.navigate('Journal');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  const handleCrisisResources = () => {
    navigation.navigate('Resources');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome back</Text>
        <Text style={styles.welcomeSubtitle}>
          Your personal council is ready to guide you
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={handleQuickChat}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="chatbubbles" size={24} color="#D4AF37" />
            </View>
            <Text style={styles.quickActionText}>Ask Your Council</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={handleViewJournal}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="book" size={24} color="#D4AF37" />
            </View>
            <Text style={styles.quickActionText}>View Journal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Usage Stats */}
      {usageStats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Usage</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{usageStats.totalTurns}</Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{usageStats.turnsToday}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{usageStats.turnsThisMonth}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
          </View>
        </View>
      )}

      {/* Subscription Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Ionicons 
              name={subscriptionActive ? "checkmark-circle" : "alert-circle"} 
              size={20} 
              color={subscriptionActive ? "#4CAF50" : "#FF9800"} 
            />
            <Text style={styles.subscriptionStatus}>
              {subscriptionActive ? 'Active' : 'Expired'}
            </Text>
          </View>
          <Text style={styles.subscriptionText}>
            {subscriptionActive 
              ? 'Your subscription is active and you can access your council'
              : 'Your subscription has expired. Please renew to continue using Pentara'
            }
          </Text>
        </View>
      </View>

      {/* Crisis Resources */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.crisisButton} onPress={handleCrisisResources}>
          <Ionicons name="medical" size={20} color="#E5E4E2" />
          <Text style={styles.crisisButtonText}>Crisis Resources</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Remember: Pentara is not therapy. If you're in crisis, please contact emergency services.
        </Text>
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
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    color: '#E5E4E2',
    fontSize: 16,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#D4AF37',
    letterSpacing: 1,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#E5E4E2',
    opacity: 0.8,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#E5E4E2',
    marginBottom: 16,
    letterSpacing: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  quickActionIcon: {
    marginBottom: 12,
  },
  quickActionText: {
    color: '#E5E4E2',
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '300',
    color: '#D4AF37',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E5E4E2',
    opacity: 0.7,
    textAlign: 'center',
  },
  subscriptionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subscriptionStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E4E2',
    marginLeft: 8,
  },
  subscriptionText: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.8,
    lineHeight: 20,
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
  footer: {
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E4E2',
  },
  footerText: {
    fontSize: 12,
    color: '#E5E4E2',
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 18,
  },
});
