import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { NewsDataType } from '@/types';
import SliderItem from '@/components/SliderItem';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

type Props = {
  newsList: Array<NewsDataType>
};

const BreakingNews = ({ newsList }: Props) => {
  const [data, setData] = useState(newsList);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });

  const handleLoadMore = () => {
    setData([...data, ...newsList]); // Append the same list for infinite scrolling
  };

  // Calculate pagination dots
  const renderPagination = () => {
    return (
      <View style={styles.paginationWrapper}>
        {newsList.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotStyle = useAnimatedStyle(() => {
            const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], Extrapolate.CLAMP);
            const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8], Extrapolate.CLAMP);
            return {
              opacity,
              transform: [{ scale }],
            };
          });
          return <Animated.View key={`dot-${index}`} style={[styles.dot, dotStyle]} />;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          data={data}
          keyExtractor={(_, index) => `list_items${index}`}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
        />
      </View>
      {renderPagination()}
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginLeft: 20,
    marginBottom: 10,
  },
  slideWrapper: {
    justifyContent: 'center',
  },
  paginationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.black,
    marginHorizontal: 4,
  },
});
