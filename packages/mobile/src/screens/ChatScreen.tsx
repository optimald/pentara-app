import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
import { sendChatMessage } from '../services/api';
import { ChatMessage, VoiceResponse, SynthesisResponse } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(route.params?.threadId || null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleImagePicker = async () => {
    // TODO: Implement image picker when expo-image-picker is properly installed
    Alert.alert(
      'Image Upload',
      'Image upload functionality will be available once the image picker is properly configured. For now, you can still send text messages to your council.',
      [{ text: 'OK' }]
    );
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]); // Remove data:image/...;base64, prefix
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error('Failed to convert image to base64');
    }
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && !selectedImage) || isLoading) return;

    let imageBase64: string | undefined;
    if (selectedImage) {
      try {
        imageBase64 = await convertImageToBase64(selectedImage);
      } catch (error) {
        Alert.alert('Error', 'Failed to process image. Please try again.');
        return;
      }
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      threadId: currentThreadId || 'new',
      type: 'user',
      content: message.trim() || (selectedImage ? '[Image]' : ''),
      timestamp: new Date(),
      isJournaled: false,
      imageUri: selectedImage || undefined,
      imageBase64: imageBase64,
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(
        message.trim() || (selectedImage ? 'Please analyze this image' : ''), 
        currentThreadId || undefined,
        imageBase64
      );
      
      if (response.success) {
        setCurrentThreadId(response.threadId);
        
        // Add voice responses
        const voiceMessages: ChatMessage[] = response.voiceResponses.map((voice: VoiceResponse) => ({
          id: `${voice.voiceId}-${voice.timestamp.getTime()}`,
          threadId: response.threadId,
          type: 'voice',
          content: voice.content,
          voiceId: voice.voiceId,
          voiceName: voice.voiceName,
          timestamp: voice.timestamp,
          isJournaled: false,
        }));

        // Add synthesis response
        const synthesisMessage: ChatMessage = {
          id: `synthesis-${response.synthesis.timestamp.getTime()}`,
          threadId: response.threadId,
          type: 'synthesis',
          content: response.synthesis.content,
          timestamp: response.synthesis.timestamp,
          isJournaled: false,
        };

        setMessages(prev => [...prev, ...voiceMessages, synthesisMessage]);
      } else {
        Alert.alert('Error', response.error || 'Failed to get response from your council');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to your council. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToJournal = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isJournaled: true } : msg
      )
    );
    Alert.alert('Added to Journal', 'This message has been saved to your journal');
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.type === 'user';
    const isVoice = msg.type === 'voice';
    const isSynthesis = msg.type === 'synthesis';

    return (
      <View key={msg.id} style={[styles.messageContainer, isUser && styles.userMessageContainer]}>
        {isVoice && (
          <View style={styles.voiceHeader}>
            <Text style={styles.voiceName}>{msg.voiceName}</Text>
            <View style={styles.voiceAvatar}>
              <Text style={styles.voiceAvatarText}>
                {msg.voiceName?.charAt(0) || '?'}
              </Text>
            </View>
          </View>
        )}
        
        {isSynthesis && (
          <View style={styles.synthesisHeader}>
            <Ionicons name="star" size={16} color="#D4AF37" />
            <Text style={styles.synthesisTitle}>Council Synthesis</Text>
          </View>
        )}

        <View style={[
          styles.messageBubble,
          isUser && styles.userMessageBubble,
          isVoice && styles.voiceMessageBubble,
          isSynthesis && styles.synthesisMessageBubble,
        ]}>
          {msg.imageUri && (
            <Image source={{ uri: msg.imageUri }} style={styles.messageImage} />
          )}
          {msg.content && (
            <Text style={[
              styles.messageText,
              isUser && styles.userMessageText,
              isVoice && styles.voiceMessageText,
              isSynthesis && styles.synthesisMessageText,
            ]}>
              {msg.content}
            </Text>
          )}
        </View>

        {!isUser && !msg.isJournaled && (
          <TouchableOpacity
            style={styles.journalButton}
            onPress={() => handleAddToJournal(msg.id)}
          >
            <Ionicons name="bookmark-outline" size={16} color="#D4AF37" />
            <Text style={styles.journalButtonText}>Save</Text>
          </TouchableOpacity>
        )}

        {msg.isJournaled && (
          <View style={styles.journaledIndicator}>
            <Ionicons name="bookmark" size={16} color="#4CAF50" />
            <Text style={styles.journaledText}>Saved</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={48} color="#E5E4E2" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>Start a conversation</Text>
            <Text style={styles.emptySubtitle}>
              Ask your personal council for guidance on any challenge or decision
            </Text>
          </View>
        )}

        {messages.map(renderMessage)}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#D4AF37" />
            <Text style={styles.loadingText}>Your council is deliberating...</Text>
          </View>
        )}
      </ScrollView>

      {/* Image Preview */}
      {selectedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.removeImageButton} onPress={handleRemoveImage}>
            <Ionicons name="close-circle" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
          <Ionicons name="image-outline" size={20} color="#D4AF37" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Ask your council for guidance..."
          placeholderTextColor="#666"
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity
          style={[styles.sendButton, ((!message.trim() && !selectedImage) || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={(!message.trim() && !selectedImage) || isLoading}
        >
          <Ionicons name="send" size={20} color="#0a0a0a" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#E5E4E2',
    marginBottom: 8,
    letterSpacing: 1,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#E5E4E2',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  voiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  voiceName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D4AF37',
    marginRight: 8,
  },
  voiceAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceAvatarText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0a0a0a',
  },
  synthesisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  synthesisTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D4AF37',
    marginLeft: 6,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessageBubble: {
    backgroundColor: '#D4AF37',
    borderBottomRightRadius: 4,
  },
  voiceMessageBubble: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  synthesisMessageBubble: {
    backgroundColor: '#D4AF37',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#0a0a0a',
  },
  voiceMessageText: {
    color: '#E5E4E2',
  },
  synthesisMessageText: {
    color: '#0a0a0a',
    fontWeight: '500',
  },
  journalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  journalButtonText: {
    fontSize: 12,
    color: '#D4AF37',
    marginLeft: 4,
  },
  journaledIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  journaledText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#E5E4E2',
    marginLeft: 8,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E4E2',
    backgroundColor: '#0a0a0a',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderColor: '#E5E4E2',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#E5E4E2',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#D4AF37',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
  },
  imageButton: {
    padding: 12,
    marginRight: 8,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#1a1a1a',
  },
});
