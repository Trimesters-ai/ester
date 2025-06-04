import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DialProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Dial({
  value,
  size = 160,
  strokeWidth = 12,
  title,
  description,
  icon,
}: DialProps) {
  const progress = useSharedValue(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    progress.value = withSpring(value / 100, { damping: 15 });
  }, [value]);

  const getColor = (value: number) => {
    if (value < 30) return '#ef4444'; // Red for danger
    if (value < 60) return '#f59e0b'; // Orange for warning
    if (value < 80) return '#10b981'; // Green for good
    return '#6366f1'; // Purple for excellent
  };

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
      stroke: getColor(progress.value * 100),
    };
  });

  const displayValue = `${Math.round(value)}%`;

  const center = size / 2;
  const rotation = -90; // Start from top
  const arcPath = `
    M ${center},${strokeWidth / 2}
    A ${radius},${radius} 0 1 1 ${center - 0.01},${strokeWidth / 2}
  `;

  // Remove touch handling props on web platform
  const circleProps = Platform.select({
    web: {},
    default: {
      onResponderTerminate: () => {},
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.dialContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          <Path
            d={arcPath}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`rotate(${rotation} ${center} ${center})`}
          />
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            animatedProps={animatedProps}
            strokeLinecap="round"
            transform={`rotate(${rotation} ${center} ${center})`}
            {...circleProps}
          />
        </Svg>
        <View style={[styles.valueContainer, { width: size, height: size }]}>
          <Text style={styles.value}>{displayValue}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 16,
  },
  dialContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotateZ: '-90deg' }],
  },
  valueContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});