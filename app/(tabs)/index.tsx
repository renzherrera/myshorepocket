import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import CarouselComponent from '@/components/CarouselComponent'
import Card from '@/components/Card'
import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'

type Props = {}

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
const Page = (props: Props) => {

  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active button index
  
  useEffect(() => {
    getBreakingNews()
  })
  const getBreakingNews = async() => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=ph&language=pi&category=business,crime,education,entertainment,politics&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      console.log(URL)
      if(response && response.data){
        setBreakingNews(response.data.results)
        setIsLoading(false)
      }
    }catch{

    }
  }
  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <StatusBar style="light" />

      <Header />
      {/* <SearchBar /> */}
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
      <View>
      <ScrollView className="mt-4 mx-4">
        <Card
          cardColor = {Colors.primaryBlue}
          headerTitle = "Latest News"
          title="Exciting News!"
          description="As for precise control over margins."
          imageUrl="https://myshorefamily.com/images/news/congratulations-to-our-third-batch-of-shoreadvantage-interns-/1b2f7dc1ee54510e7b4556204c3a8105468cc7b8-482b8da14a428649496c9c74b1e1d3f37bd4152e.jpeg"
          buttonUrl="https://example.com/news1"
        />
         <Card
          cardColor = {Colors.primaryGreen}
          headerTitle = "SHORESHOP"
          title="Exciting News!"
          description="This is a short description of the news."
          imageUrl="https://myshorefamily.com/images/tools/1716534904363-5d6cecc244a7cee97501e5dfa86c4bcb3c07b590.jpeg"
          buttonUrl="https://example.com/news1"
        />

        <Card
          cardColor = {Colors.primaryBlue}
          headerTitle = "Latest News"
          title="Exciting News!"
          description="This is a short description of the news."
          imageUrl="https://myshorefamily.com/images/news/congratulations-to-our-third-batch-of-shoreadvantage-interns-/1b2f7dc1ee54510e7b4556204c3a8105468cc7b8-482b8da14a428649496c9c74b1e1d3f37bd4152e.jpeg"
          buttonUrl="https://example.com/news1"
        />
      
      </ScrollView>
      </View>

      {/* {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        // <BreakingNews newsList={breakingNews}/>
        ''
      )} */}
  </View>
  
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})