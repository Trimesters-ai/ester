import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Droplets, Moon, Activity } from 'lucide-react-native';
import { router } from 'expo-router';
import Dial from '../../../components/Dial';
import { getLatestScores, getScoreDescription } from '../../../data/mockData';

export default function InsightsScreen() {
  const scores = getLatestScores();

  const handleMetricPress = (metric: string) => {
    if (metric === 'heartRate') {
      router.push('/insights/heart-rate');
    } else {
      router.push(`/insights/trend?metric=${metric}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity 
          onPress={() => handleMetricPress('heartRate')}
          activeOpacity={0.8}
          style={styles.heartRateCard}
        >
          <View style={styles.heartRateHeader}>
            <Heart size={24} color="#e11d48" />
            <Text style={styles.heartRateTitle}>Heart Rate</Text>
          </View>
          <View style={styles.heartRateStats}>
            <View style={styles.heartRateStat}>
              <Text style={styles.heartRateValue}>{scores.heartRate.current}</Text>
              <Text style={styles.heartRateLabel}>Current BPM</Text>
            </View>
            <View style={styles.heartRateStat}>
              <Text style={styles.heartRateValue}>{scores.heartRate.resting}</Text>
              <Text style={styles.heartRateLabel}>Resting BPM</Text>
            </View>
            <View style={styles.heartRateStat}>
              <Text style={styles.heartRateValue}>{scores.heartRate.max}</Text>
              <Text style={styles.heartRateLabel}>Max BPM</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleMetricPress('recovery')}
          activeOpacity={0.8}
        >
          <Dial
            value={scores.recovery.value}
            title="Recovery Score"
            description={getScoreDescription('recovery', scores.recovery.value)}
            icon={<Heart size={32} color="#e11d48" />}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleMetricPress('sleep')}
          activeOpacity={0.8}
        >
          <Dial
            value={scores.sleep.value}
            title="Sleep Quality"
            description={getScoreDescription('sleep', scores.sleep.value)}
            icon={<Moon size={32} color="#6366f1" />}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleMetricPress('hydration')}
          activeOpacity={0.8}
        >
          <Dial
            value={scores.hydration.value}
            title="Hydration Level"
            description={getScoreDescription('hydration', scores.hydration.value)}
            icon={<Droplets size={32} color="#0ea5e9" />}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleMetricPress('strain')}
          activeOpacity={0.8}
        >
          <Dial
            value={scores.strain.value}
            title="Daily Strain"
            description={getScoreDescription('strain', scores.strain.value)}
            icon={<Activity size={32} color="#a855f7" />}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  heartRateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  heartRateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  heartRateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 12,
  },
  heartRateStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heartRateStat: {
    alignItems: 'center',
  },
  heartRateValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e11d48',
  },
  heartRateLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});