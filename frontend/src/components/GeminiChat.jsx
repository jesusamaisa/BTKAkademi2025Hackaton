// frontend/src/components/GeminiChat.jsx (devam)
  const quickQuestions = [
    "Bu ürün hangi mevsimde giyilir?",
    "Bakımı nasıl yapılır?",
    "Hangi renklerle kombinlenir?",
    "Beden seçimi için öneriniz nedir?"
  ];

  if (showApiKeyInput && !apiKey) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <SparklesIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Gemini AI Asistan</h3>
          <p className="text-gray-600 mb-4">
            AI asistanı kullanmak için Google Gemini API anahtarınızı girin
          </p>
          <input
            type="password"
            placeholder="Gemini API Key"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button
            onClick={() => setShowApiKeyInput(false)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            disabled={!apiKey}
          >
            Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-6 h-6" />
            <h3 className="font-semibold">AI Moda Asistanı</h3>
          </div>
          <button
            onClick={() => setShowApiKeyInput(true)}
            className="text-white/80 hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-primary-600' : 'bg-gray-200'
                }`}>
                  {message.role === 'user' ? (
                    <UserIcon className="w-5 h-5 text-white" />
                  ) : (
                    <SparklesIcon className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 border-t">
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ürün hakkında soru sorun..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );

export default GeminiChat;