import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import CarouselComponent from '@/components/CarouselComponent'
import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import '../../gesture-handler';
import Dashboard from '@/components/Dashboard'
import MainDashboard from '@/components/MainDashboard'
type Props = {}



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
    // getBreakingNews()
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

    <MainDashboard/>

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