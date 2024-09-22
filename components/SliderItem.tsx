import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, interpolate, Extrapolate, SharedValue, Extrapolation } from 'react-native-reanimated';
import { NewsDataType } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

type Props = {
  slideItem: NewsDataType,
  index: number,
  scrollX: SharedValue<number>
};

const { width } = Dimensions.get('screen');

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: interpolate(scrollX.value,
                                [(index -1) * width, index * width, (index + 1)  * width],
                                [-width * 0.15, 0, width * 0.15],
                                Extrapolation.CLAMP
        ) },
        {
          scale: interpolate(scrollX.value,
                            [(index - 1) * width, index * width, (index + 1) * width],
                            [1, 1, 0.9],
                            Extrapolation.CLAMP
          )
        }
      ]
    };
  });

  return (
    <Animated.View style={[styles.itemWrapper, rnStyle]}>
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      {/* Gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.textWrapper}>
        <View style={styles.sourceInfo}>
          <Image source={{ uri: slideItem.source_icon }} style={styles.sourceIcon} />
          <Text style={styles.sourceName}>{slideItem.source_name}</Text>
        </View>
        <Text style={styles.title}>{slideItem.title}</Text>
      </View>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: 'relative',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  sourceIcon: {
    height: 25,
    width: 25,
    borderRadius: 20,
  },
  sourceInfo: {
    flexDirection: 'row'
  },
  sourceName: {
    fontWeight: '400',
    color: Colors.white,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    position: 'absolute',
    width: width * 0.9,
    height: 180,
    borderRadius: 20,
    bottom: 0,
  },
  textWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    marginLeft: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
