import React, { useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { Card } from 'react-native-paper';

type Album = {
  name: string;
  description: string | null;
  image: string;
  videoUrl: string | null;
  key: string;
};

const Page = () => {
  // Sample album data from API response structure
  const albums: Album[] = [
    {
      name: 'Shore360 Agency Birthday Blowout Celebration | November 2024', 
      description: null,
      image: 'https://myshorefamily.com/images/gallery/655/8e507ccc0e34e6b793d78b192a93f8e626245f98-f65947c25ca13ccb03f5f1594d65771f8e817b39.jpg',
      videoUrl: null,
      key: '8e507ccc0e34e6b793d78b192a93f8e626245f98',
    },
    {
      name: 'Shore360 Agency | Teambuilding | November 20, 2024',
      description: null,
      image: 'https://myshorefamily.com/images/gallery/652/c4fbd0751ade068d3e77d4ea51ed8f6e72da6e72-f9718c813998c684abb15277dada91551be7f0bc.JPG',
      videoUrl: null,
      key: 'c4fbd0751ade068d3e77d4ea51ed8f6e72da6e72',
    },
    {
      name: 'ShoreFoundation: Aeta Outreach Program | December 1, 2024',
      description: null,
      image: 'https://myshorefamily.com/images/gallery/649/8c92da06f04f73d32cc24d206c2119803c9acd6a-ea270f863669a2749df8c9c746f8f0f0eaf56e9f.jpg',
      videoUrl: null,
      key: '8c92da06f04f73d32cc24d206c2119803c9acd6a',
    },
    {
      name: 'LUMO360 RAVE PARTY | November 22, 2024',
      description: null,
      image: 'https://myshorefamily.com/images/gallery/646/0cf76997a59320c62d9b1ad7b8a564d19a90d09f-39afdc86126db2afed1ec4a9971882279f1fcbb2.jpg',
      videoUrl: null,
      key: '0cf76997a59320c62d9b1ad7b8a564d19a90d09f',
    },
    {
      name: "Open House Recruitment | November 15 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/643/0aa852ce472627d532ba31742309ae148a94eba5-43515016e4a2bbc9d095c65b355455382bb0e048.jpg',
      videoUrl: null,
      key: '0aa852ce472627d532ba31742309ae148a94eba5',
    },
    {
      name: "Spooktacular Spaces: Decorate Your Bay | Halloween | October 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/640/d2b6e059ed2965a5bb8cfbf95454ea66ff633f4a-fa1b8e463e3dd57ad818e9fc5bfc886a29e60768.jpg',
      videoUrl: null,
      key: 'd2b6e059ed2965a5bb8cfbf95454ea66ff633f4a',
    },
    {
      name: "ShoreBonding | September Starters | October 10, 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/637/0e8841efd1fc5ca6dce3958b712cc65fe07c4d29-3bde277e79efa44d13554c6c5d48a92fcd274633.jpg',
      videoUrl: null,
      key: '0e8841efd1fc5ca6dce3958b712cc65fe07c4d29',
    },
    {
      name: "Shore360 Agency Fun Day and Birthday Blowout Celebration | September 27, 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/634/fce44f5bca70df0ee26ecbd5879a57040be61df5-acd386381477b3c250ecc6dda9dd0eca1c045183.jpeg',
      videoUrl: null,
      key: 'fce44f5bca70df0ee26ecbd5879a57040be61df5',
    },
    {
      name: "ShoreBonding | August Starters 2024 | September 27, 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/631/4be7acd68e26f8469fe05ee4904659ce939307ab-b82e498996f921ee964c23bbff62dd3fc2de17dc.jpeg',
      videoUrl: null,
      key: '4be7acd68e26f8469fe05ee4904659ce939307ab',
    },
    {
      name: "BPO Friendship Games Opening | September 23 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/628/aeaa252d9c7d5ecb9662a4547392836c154bd71c-56722c4534e351e149044dc9dc885d6d7b4951bd.jpg',
      videoUrl: null,
      key: 'aeaa252d9c7d5ecb9662a4547392836c154bd71c',
    },
    {
      name: "ShoreAdvantage | Batch 3 | September 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/625/d77dd6cc3f667501db32e972e92182fc67c12e22-2139c37a756f734bea64b0a5247eeb4968063039.jpeg',
      videoUrl: null,
      key: 'd77dd6cc3f667501db32e972e92182fc67c12e22',
    },
    {
      name: "Recognition of Loyal Employees | August & September 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/622/eeff717b73d9b0679a0d51f35c8d98c69da1ced9-8bc415bc6e968ac4a1d686f39d4b6d3c6de2cf4c.jpg',
      videoUrl: null,
      key: 'eeff717b73d9b0679a0d51f35c8d98c69da1ced9',
    },
    {
      name: "Shore360 Agency Birthday Blowout Celebration | August 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/619/e4952d0282e8c0c6f9e850c5354b8577f842d0cf-e0bc3ece9fac95efc00d0be01a5a2ddd91298bba.jpg',
      videoUrl: null,
      key: 'e4952d0282e8c0c6f9e850c5354b8577f842d0cf',
    },
    {
      name: "ShoreFoundation | Typhoon Carina Donation Drive | September 8, 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/616/ef6a92cd3b17b5cb4f2cc82a8b9906491dd541e3-8da8698b1649e7b110d5c7140970bb9b491c0acd.jpg',
      videoUrl: null,
      key: 'ef6a92cd3b17b5cb4f2cc82a8b9906491dd541e3',
    },
    {
      name: "ShoreFoundation | Typhoon Carina Donation Drive | August 31, 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/613/a383ec0fcd18baec671f3578be6236b93f8152c6-986cf4b62e1d887e2896614c20b1b4400cbf37ee.jpg',
      videoUrl: null,
      key: 'a383ec0fcd18baec671f3578be6236b93f8152c6',
    },
    {
      name: "ShoreBonding | July Starters 2024 | August 30, 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/604/e0dd6f72f283f85b21b7d218e645c3363337eccb-38fd20ea766b1fc8c6ad17d6eeb9778c1b0ce9bb.jpg',
      videoUrl: null,
      key: 'e0dd6f72f283f85b21b7d218e645c3363337eccb',
    },
    {
      name: "Health and Wellness: Wellness Wednesday, Nutrition and Counseling | August 28, 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/601/921b1132da291b19070573844e39ee4a0d67f68c-3ca6f7c62a23bc5ba72f97f33e36c93a3bde66e5.jpg',
      videoUrl: null,
      key: '921b1132da291b19070573844e39ee4a0d67f68c',
    },
    {
      name: "Shore360 Agency Birthday Blowout Celebration | July 2024",
      description: null,
      image: 'https://myshorefamily.com/images/gallery/598/6a5355f604f41e2e2222d7bbff0c7f679c3a4cae-00433a4ea2b927b320a227693c18b840fa007018.jpg',
      videoUrl: null,
      key: '6a5355f604f41e2e2222d7bbff0c7f679c3a4cae',
    }
  ];
  
  // Memoized album card render to avoid unnecessary re-renders
  const renderItem = useCallback(({ item }: { item: Album }) => {
    return (
      <Card style={styles.albumCard}>
        {/* Optimized Image Loading */}
        <Image 
          source={{ uri: item.image }} 
          style={styles.albumImage} 
          resizeMode="cover"
        />
        <Card.Content>
          <Text style={styles.albumTitle}>{item.name}</Text>
          {item.description && (
            <Text style={styles.albumDescription}>{item.description}</Text>
          )}
        </Card.Content>
      </Card>
    );
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  albumImage: {
    width: '100%',
    height: 200,
  },
  albumCard: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  albumDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default Page;
