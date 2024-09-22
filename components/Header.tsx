import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>

      <View style={styles.userInfo}>
        <Image source={{uri: 'https://xsgames.co/randomusers/avatar.php?g=male'}} style={styles.userImg}/>
        <View style={{gap:3}}>
            <Text style={styles.welcomeText} >Welcome</Text>
            <Text style={styles.userName}>Renz Gabriel!</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name ='notifications-outline' size={24} color = {Colors.black}/>
      </TouchableOpacity>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    userImg:{
        width: 50,
        height: 50,
        borderRadius: 30
    },
    userInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20

    },
    welcomeText: {
        fontSize: 12,
        color: Colors.darkGrey
    },
    userName: {
        fontSize: 14 ,
        fontWeight:'700',
        color: Colors.black
    }
})