// frontend/src/components/GeminiChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaperAirplaneIcon, 
  SparklesIcon,
  UserIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const GeminiChat = ({ product }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Merhaba! ${product.name} hakkında merak ettiğiniz her şeyi bana sorabilirsiniz. Size yardımcı olmaktan mutluluk duyarım! 🛍️`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePrompt = (userQuestion) => {
    return `
Sen bir moda ve giyim uzmanısın. Aşağıdaki ürün hakkında kullanıcının sorusuna yardımcı ol:

Ürün Bilgileri:
- İsim: ${product.name}
- Marka: ${product.brand}
- Fiyat: ${product.currentPrice} TL
- Malzeme: ${product.specifications.material}
- Renkler: ${product.specifications.color.join(', ')}
- Bedenler: ${product.specifications.sizes.join(', ')}
- Bakım: ${product.specifications.care}
- Ortalama Puan: ${product.ratings.average}/5 (${product.ratings.count} değerlendirme)

Kullanıcı Sorusu: ${userQuestion}

Lütfen samimi, yardımcı ve bilgilendirici bir şekilde cevap ver. Emoji kullanabilirsin.
`;
  };

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = generatePrompt(input);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      toast.error('AI yanıt veremedi. Lütfen daha sonra tekrar deneyin.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  