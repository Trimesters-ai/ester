import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Bird } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface PostpartumTimelineProps {
  weeksPostpartum: number;
}

export default function PostpartumTimeline({ weeksPostpartum }: PostpartumTimelineProps) {
  const hoverValue = useSharedValue(0);
  
  React.useEffect(() => {
    hoverValue.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 1000 }),
        withTiming(-5, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const progressWidth = (Math.min(weeksPostpartum, 52) / 52) * (width - 32);
  
  const birdStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: hoverValue.value },
        { rotate: withSpring(weeksPostpartum > 12 ? '180deg' : '0deg') }
      ]
    };
  });

  const getPhaseText = () => {
    if (weeksPostpartum <= 12) {
      return 'Early Postpartum Phase';
    }
    return 'Extended Postpartum Phase';
  };

  const getProgressText = () => {
    if (weeksPostpartum <= 12) {
      return `Week ${weeksPostpartum} of Initial Recovery`;
    }
    return `Month ${Math.floor(weeksPostpartum / 4)} of Extended Recovery`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getPhaseText()}</Text>
      <Text style={styles.subtitle}>{getProgressText()}</Text>
      
      <View style={styles.timelineContainer}>
        <View style={styles.timeline}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: progressWidth }]} />
          </View>
          
          <View style={styles.markers}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>Birth</Text>
            </View>
            <View style={[styles.marker, styles.middleMarker]}>
              <Text style={styles.markerText}>3 Months</Text>
            </View>
            <View style={[styles.marker, styles.endMarker]}>
              <Text style={styles.markerText}>12 Months</Text>
            </View>
          </View>
        </View>

        <Animated.View style={[styles.birdContainer, birdStyle, { left: progressWidth - 12 }]}>
          <Bird size={24} color="#7c3aed" style={styles.bird} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  timelineContainer: {
    position: 'relative',
    height: 80,
  },
  timeline: {
    paddingTop: 40,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e5e5',
    borderRadius: 2,
  },
  progress: {
    height: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 2,
  },
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    top: 8,
  },
  marker: {
    alignItems: 'flex-start',
  },
  middleMarker: {
    alignItems: 'center',
  },
  endMarker: {
    alignItems: 'flex-end',
  },
  markerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  birdContainer: {
    position: 'absolute',
    top: 0,
  },
  bird: {
    transform: [{ rotate: '0deg' }],
  },
});