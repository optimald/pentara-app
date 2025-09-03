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
import { JournalEntry } from '../types';

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = async () => {
    // TODO: Load from local SQLite database
    // For now, using mock data
    setTimeout(() => {
      setEntries([
        {
          id: '1',
          userId: 'user1',
          threadId: 'thread1',
          title: 'Leadership Challenge',
          content: 'My council helped me navigate a difficult team situation. Marcus Aurelius reminded me to focus on what I can control, while Maya Angelou encouraged me to find my authentic voice in the conversation.',
          tags: ['leadership', 'team', 'communication'],
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
        },
        {
          id: '2',
          userId: 'user1',
          threadId: 'thread2',
          title: 'Career Decision',
          content: 'Facing a major career decision, my council provided diverse perspectives. Steve Jobs challenged me to think differently about the opportunity, while Oprah encouraged me to consider what truly brings me joy.',
          tags: ['career', 'decision', 'growth'],
          createdAt: new Date('2024-01-12'),
          updatedAt: new Date('2024-01-12'),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteEntry = (entryId: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setEntries(prev => prev.filter(entry => entry.id !== entryId));
          },
        },
      ]
    );
  };

  const handleExportJournal = () => {
    Alert.alert(
      'Export Journal',
      'Export your journal entries as a Markdown file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => {
            // TODO: Implement export functionality
            Alert.alert('Export', 'Journal export feature coming soon!');
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your journal...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="book-outline" size={48} color="#E5E4E2" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No journal entries yet</Text>
          <Text style={styles.emptySubtitle}>
            Save meaningful conversations with your council to build your personal journal
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Journal</Text>
            <TouchableOpacity style={styles.exportButton} onPress={handleExportJournal}>
              <Ionicons name="download-outline" size={20} color="#D4AF37" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.entriesContainer} contentContainerStyle={styles.entriesContent}>
            {entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteEntry(entry.id)}
                  >
                    <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.entryDate}>{formatDate(entry.createdAt)}</Text>
                
                <Text style={styles.entryContent} numberOfLines={4}>
                  {entry.content}
                </Text>
                
                {entry.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {entry.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </>
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
  exportButton: {
    padding: 8,
  },
  entriesContainer: {
    flex: 1,
  },
  entriesContent: {
    padding: 20,
  },
  entryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E4E2',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  entryDate: {
    fontSize: 12,
    color: '#E5E4E2',
    opacity: 0.6,
    marginBottom: 12,
  },
  entryContent: {
    fontSize: 14,
    color: '#E5E4E2',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#0a0a0a',
    fontWeight: '500',
  },
});
