import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Clock, ChevronDown, ChevronUp } from 'lucide-react-native';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  preview: string;
  timestamp: Date;
  messages: Message[];
}

export default function ChatScreen() {
  const [showHistory, setShowHistory] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: '1',
    preview: 'Current Session',
    timestamp: new Date(),
    messages: [
      {
        id: '1',
        text: "Hello! I'm your postpartum recovery assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ],
  });
  
  const [chatHistory] = useState<ChatSession[]>([
    {
      id: '2',
      preview: 'Discussion about sleep patterns',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messages: [
        {
          id: '1',
          text: "How's your sleep been lately?",
          isUser: false,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
          id: '2',
          text: "I've been having trouble sleeping through the night.",
          isUser: true,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 1000),
        },
      ],
    },
    {
      id: '3',
      preview: 'Exercise recommendations',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      messages: [
        {
          id: '1',
          text: "What kind of exercises are safe for me now?",
          isUser: true,
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        },
      ],
    },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setCurrentSession(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setCurrentSession(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
      }));
    }, 1000);
  };

  const getAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes('exercise') || input.includes('workout')) {
      return "Based on your recent Whoop recovery score of 65%, light exercises like walking and gentle stretching are recommended. Wait until your recovery score consistently reaches 75% before starting more intense workouts. Your body is still healing from pregnancy.";
    } else if (input.includes('sleep') || input.includes('rest')) {
      return "Your Whoop data shows you're getting interrupted sleep patterns, typical for new mothers. Try to sleep when your baby sleeps. Your current strain score suggests you need 8-9 hours of sleep for optimal recovery.";
    } else if (input.includes('hydration') || input.includes('water')) {
      return "Your hydration levels are currently at 45%. As a nursing mother, you should aim to drink at least 16 cups of water daily. Set reminders to drink water during feeding sessions.";
    }
    return "I can help you interpret your Whoop data for exercise readiness, sleep quality, and hydration levels. What specific aspect of your recovery would you like to know about?";
  };

  const loadChatSession = (session: ChatSession) => {
    setCurrentSession(session);
    setShowHistory(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recovery Assistant</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => setShowHistory(!showHistory)}
        >
          <Clock size={20} color="#666" />
          {showHistory ? (
            <ChevronUp size={20} color="#666" />
          ) : (
            <ChevronDown size={20} color="#666" />
          )}
        </TouchableOpacity>
      </View>

      {showHistory && (
        <View style={styles.historyPanel}>
          <Text style={styles.historyTitle}>Chat History</Text>
          <ScrollView style={styles.historyList}>
            {chatHistory.map((session) => (
              <TouchableOpacity
                key={session.id}
                style={styles.historyItem}
                onPress={() => loadChatSession(session)}
              >
                <Text style={styles.historyPreview}>{session.preview}</Text>
                <Text style={styles.historyTimestamp}>
                  {format(session.timestamp, 'MMM d, h:mm a')}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      <ScrollView style={styles.messagesContainer}>
        {currentSession.messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.assistantMessage,
            ]}>
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.assistantMessageText,
            ]}>
              {message.text}
            </Text>
            <Text style={styles.messageTimestamp}>
              {format(message.timestamp, 'h:mm a')}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about your recovery..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Send size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  historyPanel: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    maxHeight: 300,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    padding: 16,
    paddingBottom: 8,
  },
  historyList: {
    maxHeight: 250,
  },
  historyItem: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  historyPreview: {
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  historyTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: '#7c3aed',
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  assistantMessageText: {
    color: '#1a1a1a',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    fontSize: 16,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});