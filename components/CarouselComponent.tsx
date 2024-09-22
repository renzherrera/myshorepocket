import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, Image, ScrollView, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = width; // Width for each image
const height = 150; // Height for images
const margin = 25; // Standard margin for all images

interface ImageData {
  url: string;
}

const CarouselComponent: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1); // Start with the second image
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const sampleImages: ImageData[] = [
    { url: 'https://myshorefamily.com/images/banner/1117777fc101906e8342a23f204f76b6b098e1c4-5e10b8f94f742318bf642512ee8c18900f394aa6.jpeg' },
    { url: 'https://myshorefamily.com/images/banner/100e12670bbacd52cae3924bd8bcc80961cb8bd8-fb1f0c30f42ec6b255dbbf0dacfa669d95b888c7.jpeg' },
    { url: 'https://myshorefamily.com/images/banner/acee4de92bd2bb4a07e0bb01c9e4ac38533423d8-3f39273a635f6fa18c9786ce3401ffe2eca8d451.jpeg' },
    { url: 'https://myshorefamily.com/images/banner/1ca88310667f530976548748d46b264e0f117e61-82c840c0a6dd670cd36ffb04b19f12c02e210c39.jpeg' },
  ];

  const imagesWithWrap = [
    sampleImages[sampleImages.length - 1], // Previous image
    ...sampleImages,
    sampleImages[0], // Next image
  ];

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % imagesWithWrap.length);
    }, 3000); // Change image every 3 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: itemWidth * activeIndex, animated: true });
    }
  }, [activeIndex]);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / itemWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
      >
        {imagesWithWrap.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {/* Uncomment this section if you want pagination dots */}
      {/* <View style={styles.pagination}>
        {sampleImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: (activeIndex - 1) === index ? '#000' : '#888' }, // Adjust for wrap
            ]}
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10, // Add top margin
  },
  scrollContainer: {
    paddingHorizontal: (Dimensions.get('window').width - itemWidth) / 2,
  },
  imageContainer: {
    width: itemWidth - 2 * margin, // Adjust width for margins
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: margin, // Apply horizontal margin
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

export default CarouselComponent;
