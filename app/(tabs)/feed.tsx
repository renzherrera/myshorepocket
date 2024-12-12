import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, FlatList } from 'react-native';
import { Avatar, Button, Card, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';  // For icons (reactions like thumbs-up)

type Post = {
  id: number;
  user: string;
  userProfileImage: string;
  content: string;
  imageUrl?: string;
  reactions: { like: number; love: number };
  comments: string[];
};

const Page = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: 'John Doe',
      userProfileImage: 'https://randomuser.me/api/portraits/men/1.jpg',  // Sample profile image
      content: 'This is a sample post by John! #reactnative #coding',
      imageUrl: 'https://placeimg.com/640/480/tech',  // Sample image for post
      reactions: { like: 12, love: 4 },
      comments: ['Great post!', 'Nice work!', 'Totally agree!'],
    },
    {
      id: 2,
      user: 'Jane Smith',
      userProfileImage: 'https://randomuser.me/api/portraits/women/1.jpg',  // Sample profile image
      content: 'Had a productive day working on a new feature. Excited to see the progress! #reactnative #developer',
      imageUrl: 'https://placeimg.com/640/480/business',  // Sample image for post
      reactions: { like: 22, love: 5 },
      comments: ['Keep up the great work!', 'Amazing progress!', 'This looks awesome!'],
    },
    // Add more sample posts as needed
  ]);

  const handlePostSubmit = () => {
    if (postContent.trim() !== '') {
      const newPost: Post = {
        id: posts.length + 1,
        user: 'User Name',  // Replace with dynamic user data
        userProfileImage: 'https://randomuser.me/api/portraits/men/2.jpg',  // Sample profile image
        content: postContent,
        reactions: { like: 0, love: 0 },
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostContent('');
    }
  };

  const handleReaction = (postId: number, type: 'like' | 'love') => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        reactions: {
          ...post.reactions,
          [type]: post.reactions[type] + 1,
        },
      } : post
    ));
  };

  const handleAddComment = (postId: number, comment: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, comment],
      } : post
    ));
  };

  return (
    <View className="bg-light" style={styles.container}>
      <View style={styles.createPostSection}>
        <TextInput
          label="What's on your mind?"
          value={postContent}
          onChangeText={setPostContent}
          style={styles.postInput}
          multiline
          numberOfLines={3}
          className="shadow-xl border"
          placeholder="What's on your mind"
        />
        <Button
          mode="contained"
          onPress={handlePostSubmit}
          style={styles.submitButton}
        >
          Post
        </Button>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.postCard}>
            <Card.Title
              title={item.user}
              subtitle="2 hours ago"
              left={() => <Avatar.Image source={{ uri: item.userProfileImage }} size={40} />}
            />
            <Card.Content>
              <Text>{item.content}</Text>
              {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}
            </Card.Content>
            <Card.Actions style={styles.reactionsContainer}>
              <IconButton
                icon={() => <Feather name="thumbs-up" size={20} color="gray" />}
                onPress={() => handleReaction(item.id, 'like')}
              />
              <Text>{item.reactions.like} Likes</Text>
              <IconButton
                icon={() => <Feather name="heart" size={20} color="red" />}
                onPress={() => handleReaction(item.id, 'love')}
              />
              <Text>{item.reactions.love} Loves</Text>
            </Card.Actions>
            <View style={styles.commentSection}>
              <TextInput
                label="Add a comment..."
                style={styles.commentInput}
                onSubmitEditing={(e) => handleAddComment(item.id, e.nativeEvent.text)}
              />
              {item.comments.map((comment, index) => (
                <Text key={index} style={styles.commentText}>
                  {comment}
                </Text>
              ))}
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '',
  },
  createPostSection: {
    marginBottom: 16,
  },
  postInput: {
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  postCard: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentSection: {
    marginTop: 12,
  },
  commentInput: {
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
  },
  commentText: {
    marginTop: 4,
    paddingLeft: 10,
    color: 'gray',
  },
});

export default Page;
