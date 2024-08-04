import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Asset } from "expo-asset";
import { AppGradient } from "./AppGradient";
import { getChatbotResponse } from "../services/api";
import Colors from "../Shared/Colors";

const ChatBotButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showCommonQuestions, setShowCommonQuestions] = useState(false);

  const commonQuestions = [
    "How about my yesterday daily routine? Any suggestions?",
    "Can you give me some work-life balance tips?",
    "What are some healthy habits I can follow?",
  ];

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! I'm Snowy. How can I assist you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot",
          avatar: Asset.fromModule(require("../Assets/Images/chaticon.png"))
            .uri,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const messageText = newMessages[0].text;

    getChatbotResponse(messageText).then((response) => {
      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot",
          avatar: Asset.fromModule(require("../Assets/Images/chaticon.png"))
            .uri,
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

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.shadow,
          },
          left: {
            backgroundColor: Colors.shadow,
          },
        }}
        textStyle={{
          right: {
            color: Colors.primary,
          },
          left: {
            color: Colors.primary,
          },
        }}
      />
    );
  };

  const iconImageUri = Asset.fromModule(
    require("../Assets/Images/chaticon.png")
  ).uri;

  return (
    <>
      <TouchableOpacity
        style={styles.chatBotButton}
        onPress={() => setModalVisible(true)}
      >
        <Image source={{ uri: iconImageUri }} style={styles.chatBotIcon} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={false}
      >
        <AppGradient>
          <View style={styles.modalContainer}>
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
                title={
                  showCommonQuestions
                    ? "Hide Common Questions"
                    : "Show Common Questions"
                }
                onPress={() => setShowCommonQuestions(!showCommonQuestions)}
                color={Colors.orange}
              />
            </View>

            {showCommonQuestions && (
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
            )}
            <View style={styles.buttonContainer}>
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color={Colors.orange}
              />
            </View>
          </View>
        </AppGradient>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  chatBotButton: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  chatBotIcon: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    padding: 10,
  },
  commonQuestionsContainer: {
    maxHeight: 200,
  },
  commonQuestionButton: {
    backgroundColor: Colors.shadow,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  commonQuestionText: {
    color: Colors.primary,
  },
});

export default ChatBotButton;
