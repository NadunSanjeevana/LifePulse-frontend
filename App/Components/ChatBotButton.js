import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const ChatBotButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! How can I assist you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot",
          avatar: "https://facebook.github.io/react/img/logo_og.png",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    // Replace with actual API call to your chatbot service
    const response = fetchChatbotResponse(newMessages[0].text).then(
      (response) => {
        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Chatbot",
            avatar: "https://placeimg.com/140/140/any",
          },
        };
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, [botMessage])
        );
      }
    );
  }, []);

  const fetchChatbotResponse = async (input) => {
    // Mock API call
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a response from the chatbot.");
      }, 1000);
    });
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#28A745",
          },
          left: {
            backgroundColor: "#ECECEC",
          },
        }}
      />
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.chatBotButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="robot-happy" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Close"
            onPress={() => setModalVisible(false)}
            color="#28A745"
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  chatBotButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#28A745",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: "white",
  },
});

export default ChatBotButton;
