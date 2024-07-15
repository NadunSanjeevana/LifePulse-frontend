// ChatBotButton.js
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatBotButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Replace with actual API call to your chatbot service
    const response = await fetchChatbotResponse(input);

    const botMessage = { sender: "bot", text: response };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInput("");
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
        <View style={styles.modalContainer}>
          <ScrollView style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <Text
                key={index}
                style={[
                  styles.message,
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                {message.text}
              </Text>
            ))}
          </ScrollView>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={sendMessage} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

const fetchChatbotResponse = async (input) => {
  // Mock API call
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a response from the chatbot.");
    }, 1000);
  });
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
    padding: 20,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flex: 1,
  },
  message: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  input: {
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default ChatBotButton;
