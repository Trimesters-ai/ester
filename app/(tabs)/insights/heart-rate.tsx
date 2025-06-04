import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { getLatestScores, getHeartRateZoneColor, getHeartRateZoneDescription } from '../../../data/mockData';
import type { HeartRateData } from '../../../data/mockData';

const { width } = Dimensions.get('window');

export default function HeartRateScreen() {
  const { heartRate } = getLatestScores();
  
  const chartData = {
    labels: heartRate.data.map((d, i) => 
      i % 10 === 0 ? format(d.timestamp, 'HH:mm') : ''
    ),
    datasets: [{
      data: heartRate.data.map(d => d.bpm),
      color: (opacity = 1) => `rgba(224, 36, 36, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const getZonePercentage = (zone: HeartRateData['zone']) => {
    const zoneCount = heartRate.data.filter(d => d.zone === zone).length;
    return Math.round((zoneCount / heartRate.data.length) * 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Heart Rate</Text>
          <View style={styles.currentHRContainer}>
            <Text style={styles.currentHR}>{heartRate.current}</Text>
            <Text style={styles.bpmLabel}>BPM</Text>
          </View>
          <View style={styles.hrStats}>
            <View style={styles.hrStat}>
              <Text style={styles.hrStatLabel}>Resting</Text>
              <Text style={styles.hrStatValue}>{heartRate.resting} bpm</Text>
            </View>
            <View style={styles.hrStat}>
              <Text style={styles.hrStatLabel}>Maximum</Text>
              <Text style={styles.hrStatValue}>{heartRate.max} bpm</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Today's Activity</Text>
          <LineChart
            data={chartData}
            width={width - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(224, 36, 36, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.zonesContainer}>
          <Text style={styles.sectionTitle}>Heart Rate Zones</Text>
          {(['maximum', 'vigorous', 'moderate', 'light', 'rest'] as const).map(zone => (
            <View key={zone} style={styles.zoneRow}>
              <View style={styles.zoneInfo}>
                <Text style={[styles.zoneName, { color: getHeartRateZoneColor(zone) }]}>
                  {zone.charAt(0).toUpperCase() + zone.slice(1)}
                </Text>
                <Text style={styles.zoneDescription}>
                  {getHeartRateZoneDescription(zone)}
                </Text>
              </View>
              <Text style={[styles.zonePercentage, { color: getHeartRateZoneColor(zone) }]}>
                {getZonePercentage(zone)}%
              </Text>
            </View>
          ))}
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
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  currentHRContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  currentHR: {
    fontSize: 64,
    fontWeight: '700',
    color: '#e11d48',
    lineHeight: 64,
  },
  bpmLabel: {
    fontSize: 20,
    color: '#666',
    marginLeft: 8,
    marginBottom: 8,
  },
  hrStats: {
    flexDirection: 'row',
    gap: 32,
  },
  hrStat: {
    alignItems: 'center',
  },
  hrStatLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  hrStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  chartContainer: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  zonesContainer: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
  },
  zoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  zoneInfo: {
    flex: 1,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  zoneDescription: {
    fontSize: 14,
    color: '#666',
  },
  zonePercentage: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
});