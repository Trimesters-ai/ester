import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { mockData, type Score } from '../../../data/mockData';
import { format, parseISO } from 'date-fns';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function TrendScreen() {
  const { metric } = useLocalSearchParams<{ metric: keyof Score }>();
  
  const data = Object.entries(mockData)
    .sort(([dateA], [dateB]) => parseISO(dateA).getTime() - parseISO(dateB).getTime())
    .map(([date, scores]) => ({
      date: format(parseISO(date), 'MMM d'),
      value: scores[metric].value,
      trend: scores[metric].trend
    }));

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      data: data.map(d => d.value),
      color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const getMetricTitle = () => {
    switch (metric) {
      case 'recovery': return 'Recovery Score';
      case 'sleep': return 'Sleep Quality';
      case 'hydration': return 'Hydration Level';
      case 'strain': return 'Daily Strain';
      default: return 'Metric';
    }
  };

  const getMetricColor = (trend: number) => {
    if (trend > 0) return '#10b981';
    if (trend < 0) return '#ef4444';
    return '#6b7280';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{getMetricTitle()} Trends</Text>
        <Text style={styles.subtitle}>Last 7 Days</Text>
      </View>

      <LineChart
        data={chartData}
        width={width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.statsContainer}>
        {data.map((day, index) => (
          <View key={day.date} style={styles.statRow}>
            <Text style={styles.statDate}>{day.date}</Text>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>{day.value}%</Text>
              <Text style={[
                styles.statTrend,
                { color: getMetricColor(day.trend) }
              ]}>
                {day.trend > 0 ? '+' : ''}{day.trend}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  chart: {
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  statsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  statDate: {
    fontSize: 16,
    color: '#374151',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 8,
  },
  statTrend: {
    fontSize: 14,
    fontWeight: '500',
  },
});