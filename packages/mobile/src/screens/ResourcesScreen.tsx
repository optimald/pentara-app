import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CrisisResource } from '../types';

export default function ResourcesScreen() {
  const [resources, setResources] = useState<CrisisResource[]>([]);

  useEffect(() => {
    loadCrisisResources();
  }, []);

  const loadCrisisResources = () => {
    // Load crisis resources
    setResources([
      {
        id: '1',
        name: 'National Suicide Prevention Lifeline',
        phone: '988',
        description: '24/7 crisis support and suicide prevention',
        available24_7: true,
        category: 'suicide_prevention',
      },
      {
        id: '2',
        name: 'Crisis Text Line',
        phone: 'Text HOME to 741741',
        description: '24/7 crisis support via text message',
        available24_7: true,
        category: 'crisis',
      },
      {
        id: '3',
        name: 'National Domestic Violence Hotline',
        phone: '1-800-799-7233',
        description: '24/7 support for domestic violence survivors',
        available24_7: true,
        category: 'domestic_violence',
      },
      {
        id: '4',
        name: 'SAMHSA National Helpline',
        phone: '1-800-662-4357',
        description: '24/7 mental health and substance abuse support',
        available24_7: true,
        category: 'mental_health',
      },
      {
        id: '5',
        name: 'Veterans Crisis Line',
        phone: '1-800-273-8255',
        description: '24/7 support for veterans in crisis',
        available24_7: true,
        category: 'crisis',
      },
    ]);
  };

  const handleCallResource = (resource: CrisisResource) => {
    const phoneNumber = resource.phone.replace(/[^\d]/g, '');
    const url = `tel:${phoneNumber}`;
    
    Alert.alert(
      'Call Crisis Resource',
      `Call ${resource.name} at ${resource.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(url).catch(() => {
              Alert.alert('Error', 'Unable to make phone call');
            });
          },
        },
      ]
    );
  };

  const handleTextResource = (resource: CrisisResource) => {
    if (resource.name === 'Crisis Text Line') {
      Alert.alert(
        'Text Crisis Support',
        'Text HOME to 741741 to connect with a crisis counselor',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              // Could potentially open SMS app with pre-filled text
            },
          },
        ]
      );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'suicide_prevention':
        return 'heart-outline';
      case 'crisis':
        return 'call-outline';
      case 'mental_health':
        return 'medical-outline';
      case 'domestic_violence':
        return 'shield-outline';
      default:
        return 'help-outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'suicide_prevention':
        return '#FF6B6B';
      case 'crisis':
        return '#4ECDC4';
      case 'mental_health':
        return '#45B7D1';
      case 'domestic_violence':
        return '#96CEB4';
      default:
        return '#D4AF37';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="medical" size={32} color="#D4AF37" />
        <Text style={styles.headerTitle}>Crisis Resources</Text>
        <Text style={styles.headerSubtitle}>
          If you're in crisis, these resources are available 24/7
        </Text>
      </View>

      {/* Important Notice */}
      <View style={styles.noticeCard}>
        <Ionicons name="warning" size={20} color="#FF9800" />
        <Text style={styles.noticeText}>
          If you're having thoughts of self-harm, please reach out to one of these resources immediately. 
          You are not alone, and help is available.
        </Text>
      </View>

      {/* Resources List */}
      <View style={styles.resourcesSection}>
        <Text style={styles.sectionTitle}>Available Resources</Text>
        
        {resources.map((resource) => (
          <View key={resource.id} style={styles.resourceCard}>
            <View style={styles.resourceHeader}>
              <View style={styles.resourceIcon}>
                <Ionicons 
                  name={getCategoryIcon(resource.category)} 
                  size={20} 
                  color={getCategoryColor(resource.category)} 
                />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>{resource.name}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                {resource.available24_7 && (
                  <View style={styles.available24_7}>
                    <Ionicons name="time-outline" size={12} color="#4CAF50" />
                    <Text style={styles.available24_7Text}>Available 24/7</Text>
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.resourceActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.callButton]}
                onPress={() => handleCallResource(resource)}
              >
                <Ionicons name="call" size={16} color="#0a0a0a" />
                <Text style={styles.callButtonText}>Call {resource.phone}</Text>
              </TouchableOpacity>
              
              {resource.name === 'Crisis Text Line' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.textButton]}
                  onPress={() => handleTextResource(resource)}
                >
                  <Ionicons name="chatbubble" size={16} color="#D4AF37" />
                  <Text style={styles.textButtonText}>Text</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Additional Information */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Important Information</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Remember:</Text>
          <Text style={styles.infoText}>
            • Pentara is not therapy or a substitute for professional mental health care{'\n'}
            • These resources are for crisis situations{'\n'}
            • If you're in immediate danger, call 911{'\n'}
            • Your conversations with these resources are confidential
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You are valued, you are important, and you deserve support.
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#D4AF37',
    marginTop: 12,
    marginBottom: 8,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#0a0a0a',
    marginLeft: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
  resourcesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#E5E4E2',
    marginBottom: 16,
    letterSpacing: 1,
  },
  resourceCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  resourceHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E4E2',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.8,
    lineHeight: 18,
    marginBottom: 8,
  },
  available24_7: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  available24_7Text: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '500',
  },
  resourceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  callButton: {
    backgroundColor: '#D4AF37',
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0a0a0a',
    marginLeft: 6,
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  textButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D4AF37',
    marginLeft: 6,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E4E2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.8,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E4E2',
  },
  footerText: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
