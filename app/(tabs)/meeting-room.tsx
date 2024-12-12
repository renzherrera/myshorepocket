import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert, Button } from 'react-native';

type MeetingRoom = {
  id: string;
  name: string;
  capacity: number;
};

type Building = {
  id: string;
  name: string;
  location: string;
  image: string;
  meetingRooms: MeetingRoom[];
};

const buildings: Building[] = [
  {
    id: '1',
    name: 'Philexcel BC6',
    location: 'Location details for BC6',
    image: 'https://via.placeholder.com/150',  // Placeholder image
    meetingRooms: [
      { id: '1A', name: 'Room A1', capacity: 12 },
      { id: '1B', name: 'Room A2', capacity: 10 },
    ],
  },
  {
    id: '2',
    name: 'Philexcel BC7',
    location: 'Location details for BC7',
    image: 'https://via.placeholder.com/150',  // Placeholder image
    meetingRooms: [
      { id: '2A', name: 'Room B1', capacity: 15 },
      { id: '2B', name: 'Room B2', capacity: 20 },
    ],
  },
  {
    id: '3',
    name: 'Mercedes Benz',
    location: 'Mercedes Benz Building, Manuel A. Roxas Hwy, Clark Freeport Zone, Pampanga',
    image: 'https://via.placeholder.com/150',  // Placeholder image
    meetingRooms: [
      { id: 'MB-Azure', name: 'Azure', capacity: 18 },
      { id: 'MB-Charcoal', name: 'Charcoal', capacity: 3 },
      { id: 'MB-Denim', name: 'Denim', capacity: 8 },
      { id: 'MB-Emerald', name: 'Emerald', capacity: 8 },
      { id: 'MB-Lime', name: 'Lime', capacity: 8 },
      { id: 'MB-Navy', name: 'Navy', capacity: 8 },
      { id: 'MB-Sand', name: 'Sand', capacity: 2 },
      { id: 'MB-Slate', name: 'Slate', capacity: 7 },
    ],
  },
  {
    id: '4',
    name: 'ShoreCafe',
    location: 'Location details for ShoreCafe',
    image: 'https://via.placeholder.com/150',  // Placeholder image
    meetingRooms: [
      { id: '4A', name: 'ShoreRoom A', capacity: 10 },
      { id: '4B', name: 'ShoreRoom B', capacity: 6 },
    ],
  },
];

const Page = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<MeetingRoom | null>(null);

  const handleBuildingSelect = (building: Building) => {
    setSelectedBuilding(building);
    setSelectedRoom(null); // Reset selected room when changing building
  };

  const handleRoomSelect = (room: MeetingRoom) => {
    setSelectedRoom(room);
  };

  const handleBooking = () => {
    if (!selectedRoom) {
      Alert.alert('Please select a meeting room');
    } else {
      Alert.alert(`Meeting room ${selectedRoom.name} booked successfully!`);
      // Here you would integrate with Outlook or Calendly for booking functionality
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meeting Room Booking</Text>

      {/* Display Buildings */}
      <FlatList
        data={buildings}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.buildingCard}
            onPress={() => handleBuildingSelect(item)}
          >
            <Image source={{ uri: item.image }} style={styles.buildingImage} />
            <Text style={styles.buildingName}>{item.name}</Text>
            <Text style={styles.buildingLocation}>{item.location}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.buildingList}
      />

      {/* Show available rooms when a building is selected */}
      {selectedBuilding && (
        <View style={styles.roomsContainer}>
          <Text style={styles.subHeader}>Select a meeting room in {selectedBuilding.name}:</Text>
          <FlatList
            data={selectedBuilding.meetingRooms}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.roomCard,
                  selectedRoom?.id === item.id && styles.selectedRoomCard,
                ]}
                onPress={() => handleRoomSelect(item)}
              >
                <Text
                  style={[
                    styles.roomText,
                    selectedRoom?.id === item.id && styles.selectedRoomText,
                  ]}
                >
                  {item.name} - {item.capacity} People
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            style={styles.roomList}
          />
        </View>
      )}

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buildingList: {
    marginBottom: 16,
  },
  buildingCard: {
    width: 150,
    height: 200,  // Fixed height
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',  // Ensures text and image are spaced well
    padding: 8,
  },
  buildingImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  buildingName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buildingLocation: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  roomsContainer: {
    width: '100%',
    maxHeight: '50%',
    marginTop: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roomList: {
    marginBottom: 16,
  },
  roomCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
    height: 60,  // Fixed height for room card
    justifyContent: 'center',
  },
  selectedRoomCard: {
    backgroundColor: '#FFC107',
  },
  roomText: {
    color: 'white',
    fontSize: 16,
  },
  selectedRoomText: {
    fontWeight: 'bold',
  },
  bookButton: {
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Page;
