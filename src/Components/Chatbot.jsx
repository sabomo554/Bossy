import React, { useState } from "react";

// Define pairs for chatbot conversation
const pairs = [
  {
    pattern: /hi|hello|hey/i,
    responses: [
      "Hello, how can I help you today?",
      "Hi, can I help you today?",
      "Hey there! How can I assist you?",
    ],
  },
  {
    pattern: /how are you/i,
    responses: [
      "I am doing great!",
      "I am good, how about you?",
      "I am good, thanks for asking!",
    ],
  },
  {
    pattern: /.*sneaker/i,
    responses: [
      "We only focus on two main brands of sneakers: Jordan and Nike.",
      "The following are some of the sneakers we sell: Jordan1, Jordan4, Jordan9, Jordan11, and all types of Nike sneakers in various styles.",
    ],
  },
  {
    pattern: /.*size/i,
    responses: [
      "We have all sizes, from kids' sizes to adult sizes.",
      "Our sneakers come in a range of sizes: US 5-13 for adults and US 2-5 for kids.",
      "Sizes vary by model, but generally, we offer sizes from small to extra large for adults.",
    ],
  },
  {
    pattern: /.*color/i,
    responses: [
      "We have a variety of colors for each sneaker type, so you can choose your favorite.",
      "Depending on the model, colors range from classic black, white, and red, to unique combinations and limited editions.",
      "You can choose from a wide range of colors including black, white, red, blue, and more!",
    ],
  },
  {
    pattern: /.*cost|.*price/i,
    responses: [
      "For Jordan sneakers, prices vary from model to model. Here are some example prices: Jordan1 - 3000, Jordan4 - 3500, Jordan9 - 4000, Jordan11 - 4500.",
      "Nike sneakers have a range of prices based on the model. Please visit our website for detailed pricing.",
      "Prices start at $100 for some Nike models, but premium Jordans like the Jordan11 can go up to $4500.",
      "The cost depends on the model and availability. For accurate pricing, check our website or reach out for specific inquiries.",
    ],
  },
  {
    pattern: /.*material/i,
    responses: [
      "Our sneakers are made from high-quality materials, including premium leather, synthetic fabrics, and durable rubber soles.",
      "We use breathable mesh and cushioned insoles to ensure maximum comfort and support for your feet.",
      "Most of our Jordans are made with high-quality leather and suede, while some Nike models feature breathable knit materials for flexibility.",
    ],
  },
  {
    pattern: /.*brand/i,
    responses: [
      "We specialize in Jordan and Nike sneakers. Both are renowned for their performance and style.",
      "Our collection focuses on the most popular brands, including Nike and Jordan, each offering a range of models.",
    ],
  },
  {
    pattern: /.*shipping/i,
    responses: [
      "We offer worldwide shipping! Shipping fees vary by location.",
      "Shipping is free on orders over $100. Delivery time depends on your location.",
      "Your order will be shipped within 2-5 business days. We offer international shipping for an additional fee.",
    ],
  },
  {
    pattern: /.*return policy/i,
    responses: [
      "We offer a 30-day return policy. If you're not satisfied with your purchase, you can return it within 30 days for a full refund.",
      "If you’re not happy with your sneakers, you can return them within 30 days, provided they are in unused condition.",
      "We have a hassle-free return policy. Returns are accepted within 30 days, and you can get a full refund or exchange.",
    ],
  },
  {
    pattern: /.*payment methods/i,
    responses: [
      "We accept all major credit cards, PayPal, and mobile payments like Apple Pay and Google Pay.",
      "You can pay using credit cards, debit cards, or online payment systems like PayPal.",
      "We support a variety of payment options, including credit cards, PayPal, and even cash on delivery in certain regions.",
    ],
  },
  {
    pattern: /.*about us/i,
    responses: [
      "You can find us on all social media platforms @sabomosneakers, or you can contact us via phone at: 0714585217 | 0755355459.",
      "We are a sneaker store passionate about providing high-quality sneakers. Reach out to us through our website or via social media @sabomosneakers.",
      "We are an online sneaker retailer dedicated to bringing you the best deals on the latest models. Follow us on Instagram and Facebook!",
    ],
  },
  {
    pattern: /.*store location/i,
    responses: [
      "We are an online-only store, but we do ship globally. You can order from anywhere in the world!",
      "Our store is online only, so you can shop from the comfort of your home, no matter where you are!",
      "We don't have a physical store, but we provide fast shipping worldwide. Visit our website to place an order!",
    ],
  },
  {
    pattern: /.*discount/i,
    responses: [
      "Check our website for any ongoing sales or discounts. You can get up to 20% off during seasonal promotions!",
      "We often run special promotions, so make sure to subscribe to our newsletter for the latest discounts!",
      "We offer discounts on select models during special sales events. Be sure to keep an eye on our website for updates!",
    ],
  },
  {
    pattern: /.*/i,
    responses: [
      "Sorry, I didn't understand your question. Could you please ask again?",
      "Can you please clarify?",
      "I'm not sure I follow, could you rephrase your question?",
      "I didn't quite get that. Could you try asking differently?",
    ],
  },
];


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };

    // Find a matching response based on the input
    const botResponse = getBotResponse(input);
    const botMessage = { text: botResponse, sender: "bot" };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Simulate a response based on user input
  const getBotResponse = (userInput) => {
    for (let pair of pairs) {
      if (pair.pattern.test(userInput)) {
        return pair.responses[
          Math.floor(Math.random() * pair.responses.length)
        ];
      }
    }
    return "Sorry, I didn't understand that. Can you please clarify?";
  };

  return (
    <div style={styles.container}>
      <button
        onClick={toggleChat}
        style={{
          ...styles.toggleButton,
          animation: "bounce 2s infinite",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#007bff";
        }}
      >
        💬 Chat
      </button>

      {isOpen && (
        <div style={styles.chatbox}>
          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#d1f7f4" : "#f3f3f3",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              placeholder="Type your message..."
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <button onClick={handleSend} style={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Keyframes animation style injection */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @media (max-width: 600px) {
          .container {
            right: 10px;
            bottom: 10px;
          }
          .chatbox {
            width: 100%;
            max-width: 400px;
            height: 80%;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
  },
  toggleButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "18px 22px",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s, transform 0.2s ease-in-out",
  },
  chatbox: {
    backgroundColor: "white",
    width: "320px",
    maxHeight: "420px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    marginTop: "10px",
    transition: "max-height 0.3s ease-out",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "80%",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "10px",
    fontSize: "14px",
  },
  sendButton: {
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 14px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Chatbot;
