import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSupercharger } from '../services/api';

import * as Location from 'expo-location';
import styles from './ChatScreen.styles';
import { useHeaderHeight } from '@react-navigation/elements'
import { ChatContext } from '../contexts/ChatContextProvider';

function ErrorSection({ onPress }) {
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={48} color="#cc0000" />
      <Text style={styles.errorMessage}>
        Please ensure you are within a Supercharger or try again.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onPress}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

function ConnectSection({ onPress }) {
  return (
    <View style={styles.connectSection}>
      <Text style={styles.connectInstructions}>
        Press connect when you're near a Supercharger
      </Text>
      <Ionicons name="battery-charging" size={48} color="#4E4E4E" />
      <TouchableOpacity style={styles.connectButton} onPress={onPress}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}


function ChatScreen({username}) {
  const [superchargerId, setSuperchargerId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const { messages, addMessage } = useContext(ChatContext);
  const inputRef = useRef();
  const flatListRef = useRef();
  const height = useHeaderHeight()
  const ws = useRef(null);
  console.log('addMessageFromContext', addMessage);
  
  useEffect(() => {
    if (superchargerId) {
      ws.current = new WebSocket(`ws://139.59.130.149:3000/${superchargerId}`);

      ws.current.onopen = () => console.log('ws opened');
      ws.current.onclose = () => console.log('ws closed');

      return () => {
        ws.current.close();
      };
    }
  }, [superchargerId]);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      setMessages(prevMessages => [...prevMessages, {...message, id: prevMessages.length + 1}]);
    };
  }, []);



  const connectToSuperCharger = async () => {
    setIsLoading(true);
    setError(false);
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      setIsLoading(false);
      return;
    }
  
    //const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const supercharger = await getSupercharger(30.3289562, -97.7064697);
    console.log('charger!', supercharger);
    setIsLoading(false);
    if (supercharger) {
      setSuperchargerId(supercharger.id);
      setIsConnected(true);
    } else {
      setError(true);
    }
  }

  const handleSend = () => {
    if(ws.current.readyState === WebSocket.OPEN) {
      // Format your message here
      const formattedMessage = JSON.stringify({
        text: message,
        author: username
      });
  
      ws.current.send(formattedMessage);
  
      // Add the message to state
      const newMessage = {
        text: message,
        author: username,
        id: messages.length + 1,
        userType: 'main'
      };
  
      // Dispatch the action to the reducer
      addMessage(newMessage);
      
      setMessage('');
      inputRef.current.clear();
    } else {
      console.log("Connection is closed.");
    }
  };
  

  const handleConnect = () => {
    setIsLoading(true);
    setError(false);
    connectToSuperCharger();
  };


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <ErrorSection onPress={handleConnect} />;
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height + 47}
    >
      {!isConnected ? (
        <ConnectSection onPress={handleConnect} />
      ) : (
        <>
          <Text>You are connected to SuperCharger {superchargerId}.  Please be respectful and have fun!</Text>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const mainUser = item.userType === 'main'
              return (
              <View style={[styles.message, mainUser ? styles.mainUser : styles.otherUser]}>
                {!mainUser ? (<Text style={styles.messageAuthor}>{item.author} {mainUser ? '' : ':'}</Text>) : null} 
                <Text>{item.text}</Text>
              </View>
            )}}
            onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
          />
          <View style={styles.messageBox}>
            <TextInput
              ref={inputRef}
              onChangeText={setMessage}
              placeholder="Type your message here..."
              style={styles.input}
            />
            <Button title="Send"  onPress={handleSend} />
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  )
}

export default ChatScreen;