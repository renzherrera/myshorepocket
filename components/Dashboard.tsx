import React from 'react';
import { ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors'
import Card from '@/components/Card'

const Dashboard = () => {
  return (
    <ScrollView
      className="mt-4 mx-4"
      contentContainerStyle={{ paddingBottom: 20 }} // Add extra padding to the bottom
    >
      <Card
        cardColor={Colors.primaryBlue}
        headerTitle="Latest News"
        title="Exciting News!"
        description="As for precise control over margins."
        imageUrl="https://myshorefamily.com/images/news/congratulations-to-our-third-batch-of-shoreadvantage-interns-/1b2f7dc1ee54510e7b4556204c3a8105468cc7b8-482b8da14a428649496c9c74b1e1d3f37bd4152e.jpeg"
        buttonUrl="https://example.com/news1"
      />
      <Card
        cardColor={Colors.primaryGreen}
        headerTitle="SHORESHOP"
        title="Exciting News!"
        description="This is a short description of the news."
        imageUrl="https://myshorefamily.com/images/tools/1716534904363-5d6cecc244a7cee97501e5dfa86c4bcb3c07b590.jpeg"
        buttonUrl="https://example.com/news2" // Changed buttonUrl for uniqueness
      />
      <Card
        cardColor={Colors.primaryBlue}
        headerTitle="Latest News"
        title="Exciting News!"
        description="This is a short description of the news."
        imageUrl="https://myshorefamily.com/images/news/congratulations-to-our-third-batch-of-shoreadvantage-interns-/1b2f7dc1ee54510e7b4556204c3a8105468cc7b8-482b8da14a428649496c9c74b1e1d3f37bd4152e.jpeg"
        buttonUrl="https://example.com/news3" // Changed buttonUrl for uniqueness
      />
    </ScrollView>
  );
};

export default Dashboard;
