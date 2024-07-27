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
import { AppGradient } from "./AppGradient";
import { getChatbotResponse } from "../services/api";

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
        text: "Hello! How can I assist you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot",
          avatar: require("../Assets/Images/man.png"),
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
          avatar: require("../Assets/Images/man.png"),
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
                color="#28A745"
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
                color="#28A745"
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
    justifyContent: "flex-end",
  },
  buttonContainer: {
    padding: 10,
  },
  commonQuestionsContainer: {
    maxHeight: 200,
  },
  commonQuestionButton: {
    backgroundColor: "#28A745",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  commonQuestionText: {
    color: "white",
  },
});

export default ChatBotButton;

// Local LLM Code
// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Button,
//   ScrollView,
//   Text,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { GiftedChat, Bubble } from "react-native-gifted-chat";
// import { AppGradient } from "./AppGradient";

// const ChatBotButton = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [showCommonQuestions, setShowCommonQuestions] = useState(false);

//   const commonQuestions = [
//     "How about my yesterday daily routine? Any suggestions?",
//     "Can you give me some work-life balance tips?",
//     "What are some healthy habits I can follow?",
//   ];

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello! How can I assist you today?",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Chatbot",
//           avatar: require("../Assets/Images/man.png"),
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((newMessages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, newMessages)
//     );

//     const messageText = newMessages[0].text;

//     fetchChatbotResponse(messageText).then((response) => {
//       const botMessage = {
//         _id: Math.random().toString(36).substring(7),
//         text: response,
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Chatbot",
//           avatar: require("../Assets/Images/man.png"),
//         },
//       };
//       setMessages((prevMessages) =>
//         GiftedChat.append(prevMessages, [botMessage])
//       );
//     });
//   }, []);

//   const handleCommonQuestion = (question) => {
//     const newMessages = [
//       {
//         _id: Math.random().toString(36).substring(7),
//         text: question,
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//         },
//       },
//     ];
//     onSend(newMessages);
//   };

//   const fetchChatbotResponse = async (input) => {
//     try {
//       const response = await fetch("http://192.168.8.197:8000/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       return data.response;
//     } catch (error) {
//       console.error("Failed to fetch chatbot response:", error);
//       return "Sorry, I am unable to respond at the moment.";
//     }
//   };

//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: "#28A745",
//           },
//           left: {
//             backgroundColor: "#ECECEC",
//           },
//         }}
//       />
//     );
//   };

//   return (
//     <>
//       <TouchableOpacity
//         style={styles.chatBotButton}
//         onPress={() => setModalVisible(true)}
//       >
//         <MaterialCommunityIcons name="robot-happy" size={24} color="white" />
//       </TouchableOpacity>

//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//         transparent={false}
//       >
//         <AppGradient>
//           <View style={styles.modalContainer}>
//             <GiftedChat
//               messages={messages}
//               onSend={(messages) => onSend(messages)}
//               user={{
//                 _id: 1,
//               }}
//               renderBubble={renderBubble}
//             />
//             <View style={styles.buttonContainer}>
//               <Button
//                 title={
//                   showCommonQuestions
//                     ? "Hide Common Questions"
//                     : "Show Common Questions"
//                 }
//                 onPress={() => setShowCommonQuestions(!showCommonQuestions)}
//                 color="#28A745"
//               />
//             </View>

//             {showCommonQuestions && (
//               <ScrollView style={styles.commonQuestionsContainer}>
//                 {commonQuestions.map((question, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={styles.commonQuestionButton}
//                     onPress={() => handleCommonQuestion(question)}
//                   >
//                     <Text style={styles.commonQuestionText}>{question}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             )}
//             <View style={styles.buttonContainer}>
//               <Button
//                 title="Close"
//                 onPress={() => setModalVisible(false)}
//                 color="#28A745"
//               />
//             </View>
//           </View>
//         </AppGradient>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   chatBotButton: {
//     position: "absolute",
//     top: 40,
//     right: 20,
//     backgroundColor: "#28A745",
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   commonQuestionsContainer: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#F6F6F6",
//   },
//   commonQuestionButton: {
//     padding: 10,
//     backgroundColor: "#28A745",
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   commonQuestionText: {
//     color: "white",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     padding: 5,
//   },
// });

// export default ChatBotButton;
