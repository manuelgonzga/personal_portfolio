import { useState, useEffect, useRef } from "react";
import { FiMessageCircle, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showWaitingMsg, setShowWaitingMsg] = useState(false);

  const chatEndRef = useRef(null);
  const waitTimeoutRef = useRef(null);

  // Scroll al final del chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, isTyping]);

  // Toggle chat abierto/cerrado con delay para icono
  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      setShowSuggestions(true);
      setShowWaitingMsg(false);
      clearTimeout(waitTimeoutRef.current);
      // Icono tarda 0.6s en aparecer con animación
      setTimeout(() => setShowIcon(true), 600);
    } else {
      setIsOpen(true);
      setShowIcon(false);
      setShowSuggestions(true);
    }
  };

  // Enviar mensaje y manejar respuesta
  const sendMessage = async (messageText) => {
    if (!messageText || messageText.trim() === "") return;

    const userMessage = { type: "user", text: messageText.trim() };
    const updatedChat = [...chat, userMessage];
    setChat(updatedChat);
    setInput("");
    setIsTyping(true);
    setShowWaitingMsg(false);

    // Si tarda más de 5s mostrar mensaje y oscurecer chat
    waitTimeoutRef.current = setTimeout(() => {
      setShowWaitingMsg(true);
    }, 5000);

    try {
      await new Promise((res) => setTimeout(res, 1000)); // delay simulado

      const res = await fetch("https://chatbot-backend-h3z4.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      setChat([...updatedChat, { type: "bot", text: data.response }]);
    } catch {
      setChat([...updatedChat, { type: "bot", text: "Error connecting to the bot 🤖" }]);
    } finally {
      clearTimeout(waitTimeoutRef.current);
      setIsTyping(false);
      setShowWaitingMsg(false);
    }
  };

  const onSendClick = () => sendMessage(input);

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const suggestions = [
    "What is your career objective?",
    "How can I contact you?",
    "What are you studying?",
    "Do you work well in teams?",
  ];

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Toggle sugerencias
  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-[350px] h-[480px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700"
          >
            {/* Overlay oscuro si espera mucho */}
            {showWaitingMsg && (
              <div className="absolute inset-0 bg-black bg-opacity-60 z-40 flex flex-col justify-center items-center p-4 rounded-2xl text-gray-300 text-center select-none">
                <p className="mb-3 text-lg italic">Connecting with ManuelBot... This could take a few minutes. 🤖</p>
                <LoadingDots />
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-violet-700 to-purple-700 text-white font-semibold tracking-wide text-lg select-none z-50">
              ManuelBot
              <button
                onClick={toggleChat}
                aria-label="Close chat"
                className="hover:text-red-400 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area: mensajes con scroll */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar"
              style={{ scrollbarWidth: "thin" }}
            >
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] px-4 py-2 rounded-xl text-sm break-words ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white self-end ml-auto"
                      : "bg-gray-700 text-gray-100 self-start mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {/* Indicador escribiendo */}
              {isTyping && !showWaitingMsg && (
                <div className="flex space-x-2 max-w-[80%] px-4 py-2 rounded-xl bg-gray-700 text-gray-100 self-start mr-auto select-none">
                  <TypingDots />
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Desplegable sugerencias fijo abajo, encima del input */}
            <div className="bg-gray-900 border-t border-gray-700 px-4 py-3 sticky bottom-[72px] z-20">
              <div className="flex justify-between items-center mb-2 text-gray-400 select-none">
                <p className="text-gray-300 font-medium text-sm">You could ask me…</p>
                <button
                  onClick={toggleSuggestions}
                  aria-label={showSuggestions ? "Hide suggestions" : "Show suggestions"}
                  className={`text-gray-400 hover:text-gray-200 transition ${
                    !showSuggestions ? "p-0" : "p-1"
                  }`}
                  style={{ minWidth: showSuggestions ? "auto" : "1.5rem" }}
                >
                  {showSuggestions ? <FiChevronDown size={22} /> : <FiChevronUp size={22} />}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {showSuggestions && (
                  <motion.div
                    key="suggestions"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-wrap gap-3"
                  >
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(s)}
                        className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow transition"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input fijo abajo */}
            <div className="flex p-3 border-t border-gray-700 bg-gradient-to-r from-violet-900 to-purple-900 sticky bottom-0 z-30">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={onInputKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none px-4 py-2 rounded-lg shadow-inner"
                aria-label="Chat input"
                autoComplete="off"
                disabled={showWaitingMsg}
              />
              <button
                onClick={onSendClick}
                className="ml-3 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg shadow-lg font-semibold transition disabled:opacity-50"
                aria-label="Send message"
                disabled={showWaitingMsg}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      {showIcon && (
        <motion.button
          onClick={toggleChat}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white rounded-full p-4 shadow-2xl focus:outline-none"
          aria-label="Open chat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FiMessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Scrollbar personalizado */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #7c3aed;
          border-radius: 3px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #7c3aed transparent;
        }
      `}</style>
    </div>
  );
};

const TypingDots = () => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-3 h-3 bg-violet-400 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          delay: i * 0.3,
        }}
      />
    ))}
  </div>
);

const LoadingDots = () => (
  <div className="flex space-x-3">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-4 h-4 bg-violet-400 rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

export default ChatWidget;
