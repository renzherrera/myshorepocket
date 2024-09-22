import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CardProps {
    cardColor: string;
    headerTitle: string;
    title: string;
    description: string;
    imageUrl: string;
    buttonUrl: string;
  }
  
  const Card: React.FC<CardProps> = ({ cardColor, headerTitle, title, description, imageUrl, buttonUrl }) => {

  return (
    <View className="m-4 bg-white shadow-md rounded overflow-hidden">
      {/* Card Header */}
      <View style={{backgroundColor: cardColor}} className="p-4 mb-1">
        <Text className="text-white text-lg font-bold text-center">{headerTitle}</Text>
      </View>

      {/* Card Image */}
      <Image
        source={{ uri: imageUrl }} // Replace with actual image URL
        className="w-full h-60"
        resizeMode="cover"
      />

      {/* Card Title and Description */}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-2">{title}</Text>
        <Text className="text-gray-700">
          {description.length > 60 ? description.slice(0, 60) + '...' : description}
        </Text>
      </View>

      {/* View More Button */}
      <TouchableOpacity style={{backgroundColor: cardColor}} className=" p-3 m-4 rounded-lg">
        <Text className="text-white text-center font-bold">View More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
