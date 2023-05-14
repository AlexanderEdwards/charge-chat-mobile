import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center', // This line will vertically center your content
      padding: 20,
    },
    logo: {
      marginBottom: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      marginHorizontal: 10,
    },
    goToChatButton: {
      backgroundColor: '#4F8EF7',
      padding: 10,
      borderRadius: 5,
    },
    goToChatButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    rulesLink: {
        color: '#007AFF',
        fontSize: 16,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      }
  });

export default styles;
