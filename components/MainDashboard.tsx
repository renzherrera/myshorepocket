import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors'
import Card from '@/components/Card'
import Header from './Header';
import CarouselComponent from './CarouselComponent';
import Dashboard from './Dashboard';
const services = [
  "Dashboard", "Feeds", "Latest News", "Helpdesk", 
  "Gallery", "Holidays", "Events", "More Services"
];
// Function to generate random colors
const colors = [
  'bg-blue-500',
  'bg-yellow-500',
  'bg-orange-500',
  'bg-red-500',
  'bg-green-500',
  'bg-purple-500'
];
const MainDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active button index
  return (
   <>
    <CarouselComponent />
    
    {/* Scrollable Button Section */}
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 mx-4">
      {services.map((service, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => setActiveIndex(index)} // Set active index on press
          className={`${colors[index % colors.length]} mx-2 my-2 py-2 px-4 rounded-lg ${activeIndex === index ? 'border-2 border-white' : ''}`} // Add border for active state
          style={{ marginHorizontal: 8 }} // Optional: use this for precise control over margins
        >
          <Text className="text-white text-base font-semibold">{service}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
    <View style={{ flex: 1 }}>
      <Dashboard />
    </View>
    </>
  );
};

export default MainDashboard;
