import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { ChatThread } from '../types';

type ConversationsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function ConversationsScreen() {
  const navigation = useNavigation<ConversationsScreenNavigationProp>();
  const [conversations, setConversations] = useState<ChatThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    // TODO: Load from local SQLite database
    // For now, using mock data
    setTimeout(() => {
      setConversations([
        {
          id: 'thread1',
          userId: 'user1',
          title: 'Leadership Challenge',
          createdAt: new Date('2024-01-15T10:30:00'),
          updatedAt: new Date('2024-01-15T11:15:00'),
          messageCount: 8,
        },
        {
          id: 'thread2',
          userId: 'user1',
          title: 'Career Decision',
          createdAt: new Date('2024-01-12T14:20:00'),
          updatedAt: new Date('2024-01-12T15:45:00'),
          messageCount: 12,
        },
        {
          id: 'thread3',
          userId: 'user1',
          title: 'Relationship Advice',
          createdAt: new Date('2024-01-10T09:15:00'),
          updatedAt: new Date('2024-01-10T10:30:00'),
          messageCount: 6,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewConversation = () => {
    navigation.navigate('Chat', { threadId: undefined });
  };

  const handleOpenConversation = (threadId: string) => {
    navigation.navigate('Chat', { threadId });
  };

  const handleDeleteConversation = (threadId: string, title: string) => {
    Alert.alert(
      'Delete Conversation',
      `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setConversations(prev => prev.filter(conv => conv.id !== threadId));
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const renderConversation = ({ item }: { item: ChatThread }) => (
    <TouchableOpacity
      style={styles.conversationCard}
      onPress={() => handleOpenConversation(item.id)}
    >
      <View style={styles.conversationHeader}>
        <View style={styles.conversationInfo}>
          <Text style={styles.conversationTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.conversationMeta}>
            {item.messageCount} messages • {formatDate(item.updatedAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteConversation(item.id, item.title)}
        >
          <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading conversations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Conversations</Text>
        <TouchableOpacity style={styles.newButton} onPress={handleNewConversation}>
          <Ionicons name="add" size={20} color="#0a0a0a" />
        </TouchableOpacity>
      </View>

      {conversations.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={48} color="#E5E4E2" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptySubtitle}>
            Start a new conversation with your council to get personalized guidance
          </Text>
          <TouchableOpacity style={styles.emptyButton} onPress={handleNewConversation}>
            <Text style={styles.emptyButtonText}>Start New Conversation</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.conversationsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E4E2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#E5E4E2',
    letterSpacing: 1,
  },
  newButton: {
    backgroundColor: '#D4AF37',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
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
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0a0a0a',
  },
  conversationsList: {
    padding: 20,
  },
  conversationCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationInfo: {
    flex: 1,
    marginRight: 12,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E4E2',
    marginBottom: 4,
  },
  conversationMeta: {
    fontSize: 12,
    color: '#E5E4E2',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
  },
});
