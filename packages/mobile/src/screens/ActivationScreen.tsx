import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { activateProfile } from '../services/api';

type ActivationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Activation'>;

interface Props {
  navigation: ActivationScreenNavigationProp;
}

export default function ActivationScreen({ navigation }: Props) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleActivation = async () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please enter your activation code');
      return;
    }

    setIsLoading(true);
    try {
      const result = await activateProfile(code.trim());
      
      if (result.success && result.profile) {
        // Store profile data securely
        // Navigate to main app
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Activation Failed', result.error || 'Invalid activation code');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to activate. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Pentara</Text>
          <Text style={styles.subtitle}>
            Your Personal Advisory Council Awaits
          </Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Activation Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Enter Your Activation Code</Text>
          <Text style={styles.formDescription}>
            Use the code provided during your onboarding session to unlock your personal council.
          </Text>
          
          <TextInput
            style={styles.codeInput}
            value={code}
            onChangeText={setCode}
            placeholder="PNR-8X2-K7"
            placeholderTextColor="#666"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={12}
          />
          
          <TouchableOpacity
            style={[styles.activateButton, isLoading && styles.activateButtonDisabled]}
            onPress={handleActivation}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#0a0a0a" />
            ) : (
              <Text style={styles.activateButtonText}>Activate Pentara</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an activation code?{'\n'}
            Book your onboarding session at pentara.app
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#D4AF37',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E4E2',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 1,
    opacity: 0.8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    marginBottom: 48,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#E5E4E2',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  formDescription: {
    fontSize: 14,
    color: '#E5E4E2',
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 32,
    lineHeight: 20,
  },
  codeInput: {
    backgroundColor: '#1a1a1a',
    borderColor: '#E5E4E2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#E5E4E2',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 24,
  },
  activateButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activateButtonDisabled: {
    opacity: 0.6,
  },
  activateButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0a0a0a',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#E5E4E2',
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: 18,
  },
});
