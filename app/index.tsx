import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Stay Updated!",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    image: require("../assets/images/myshore1.jpg"),
  },
  {
    title: "Join the Community",
    description: "Connect with like-minded people around the world.",
    image: require("../assets/images/myshore2.jpg"),
  },
  {
    title: "Unlock Features",
    description: "Access premium features and stay ahead of the curve.",
    image: require("../assets/images/myshore3.jpg"),
  },
  {
    title: "Get Started",
    description: "Sign up now and enjoy the full experience.",
    image: require("../assets/images/myshore4.png"),
  },
];

const Page = () => {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null); // Specify the type here

  const handleNextPress = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
    } else {
      router.replace("/(tabs)");
    }
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlideIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const SlideItem = ({ item }) => (
    <ImageBackground source={item.image} style={styles.imageBackground} resizeMode="cover">
      <View style={styles.wrapper}>
        <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(500)}>
          {item.title}
        </Animated.Text>
        <Animated.View  entering={FadeInRight.delay(700).duration(500)}>
          <Text className="text-center my-2 text-white">{item.description}</Text>
        </Animated.View>

        <Animated.View  entering={FadeInRight.delay(900).duration(700)}>
          <TouchableOpacity style={styles.btn} onPress={handleNextPress}>
            <Text style={styles.btnText}>
              {currentSlideIndex === slides.length - 1 ? "Go to Home Screen" : "Next"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
     
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
     
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width,
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    paddingTop: 5,
    fontWeight: "400",
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  btn: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});
