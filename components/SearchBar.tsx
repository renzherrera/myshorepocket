import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
};

const SearchBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name='search-outline' size={20} color={Colors.lightGrey} />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder || 'Search...'}
        placeholderTextColor={Colors.lightGrey}
        onChangeText={props.onChangeText}
        value={props.value}
        autoCapitalize='none'
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    height: 40,
    marginBottom:20
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.lightGrey,
  },
});
