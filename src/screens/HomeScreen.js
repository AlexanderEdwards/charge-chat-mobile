import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import styles from './HomeScreen.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const goToChat = (navigation) => {
  Alert.prompt(
    "Enter your username",
    "This will be used as your name in the chat.  Please remember to be respectful.",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: (name) => {  
          navigation.reset({
            index: 0,
            routes: [{ name: 'Chat', params: { username: name } }],
          });
         }
      }
    ],
    'plain-text'
  );
};

function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const rules = `1. Be respectful to others.\n
  2. No hate speech or bullying.\n
  3. No inappropriate or explicit content.\n
  4. Keep personal information private.\n
  5. Do not spam.\n
  6. Follow local laws and regulations.
  Please follow our rules and report anyone who is breaking them.  We take abuse seriously and will ban by device.`;
  


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalText}>{rules}</Text>
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Rules</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Icon name="comments" size={100} color="#4F8EF7" style={styles.logo} />
      <Text style={styles.title}>Welcome to ChargeChat</Text>
      <Text style={styles.description}>
        Connect with other users near Superchargers and join the conversation.
        When you are near a Supercharger, press the "Go to chat" button to get
        started.
      </Text>
      <TouchableOpacity
        style={styles.goToChatButton}
        onPress={() => goToChat(navigation)}
      >
        <Text style={styles.goToChatButtonText}>Go to chat</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.rulesLink}>Our Rules</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
