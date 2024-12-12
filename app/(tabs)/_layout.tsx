import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=male' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const TabLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name="helpdesk"
          options={{
            drawerLabel: "Shorehub HelpDesk",
            title: "Shorehub HelpDesk",
          }}
        />
        <Drawer.Screen
          name="feed"
          options={{
            drawerLabel: "Feeds",
            title: "Feeds",
          }}
        />
        <Drawer.Screen
          name="gallery"
          options={{
            drawerLabel: "Gallery",
            title: "Gallery",
          }}
        />
        <Drawer.Screen
          name="meeting-room"
          options={{
            drawerLabel: "Meeting Rooms",
            title: "Meeting Rooms",
          }}
        />
        <Drawer.Screen
          name="attendance-leave"
          options={{
            drawerLabel: "Attendances & Leaves",
            title: "Attendances & Leaves",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
