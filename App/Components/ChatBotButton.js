import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const ChatBotButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const commonQuestions = [
    "How about my yesterday daily routine? Any suggestions?",
    "Can you give me some work-life balance tips?",
    "What are some healthy habits I can follow?",
  ];

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! How can I assist you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const messageText = newMessages[0].text;

    fetchChatbotResponse(messageText).then((response) => {
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
    });
  }, []);

  const handleCommonQuestion = (question) => {
    const newMessages = [
      {
        _id: Math.random().toString(36).substring(7),
        text: question,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      },
    ];
    onSend(newMessages);
  };

  const fetchChatbotResponse = async (input) => {
    try {
      const response = await fetch("http://192.168.8.197:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Failed to fetch chatbot response:", error);
      return "Sorry, I am unable to respond at the moment.";
    }
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
        <ScrollView style={styles.commonQuestionsContainer}>
          {commonQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={styles.commonQuestionButton}
              onPress={() => handleCommonQuestion(question)}
            >
              <Text style={styles.commonQuestionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  commonQuestionsContainer: {
    padding: 10,
    backgroundColor: "#F6F6F6",
  },
  commonQuestionButton: {
    padding: 10,
    backgroundColor: "#28A745",
    borderRadius: 5,
    marginVertical: 5,
  },
  commonQuestionText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: "white",
  },
});

export default ChatBotButton;
