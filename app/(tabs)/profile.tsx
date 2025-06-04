import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-web';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Bell, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import PostpartumTimeline from '../../components/PostpartumTimeline';

export default function ProfileScreen() {
  // Calculate weeks postpartum (example: 8 weeks)
  const weeksPostpartum = 8;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Sarah Johnson</Text>
          <Text style={styles.details}>{weeksPostpartum} weeks postpartum</Text>
        </View>

        <View style={styles.timelineSection}>
          <PostpartumTimeline weeksPostpartum={weeksPostpartum} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Journey</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>56</Text>
              <Text style={styles.statLabel}>Days tracked</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>72%</Text>
              <Text style={styles.statLabel}>Avg Recovery</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>6.5h</Text>
              <Text style={styles.statLabel}>Avg Sleep</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={24} color="#666" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Bell size={24} color="#666" />
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={24} color="#666" />
            <Text style={styles.menuText}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={24} color="#666" />
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  timelineSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7c3aed',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: '#fff',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#1a1a1a',
  },
});