
import React, { useState } from 'react';
import { CommunityPost } from '../types';
import { MessageCircle, ThumbsUp, Share2, Sparkles, Send, Loader2, Info } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface CommunityProps { posts: CommunityPost[]; }

const Community: React.FC<CommunityProps> = ({ posts }) => {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    try {
      const advice = await geminiService.getParentingAdvice(aiQuestion);
      setAiResponse(advice);
    } catch (error) {
      setAiResponse("Lo sentimos, en este momento no pudimos procesar tu consulta. Inténtalo de nuevo más tarde.");
    } finally { setIsAiLoading(false); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeIn">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-3xl font-black text-gray-800 flex items-center">
          Foro de la Comunidad
          <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-pink-200 to-transparent rounded-full"></div>
        </h2>
        
        {posts.map(post => (
          <div key={post.id} className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:border-pink-200 transition-colors">
            <div className="flex items-center space-x-3 mb-5">
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full border border-gray-100" />
              <div>
                <h4 className="font-bold text-gray-800">{post.author}</h4>
                <p className="text-xs text-gray-400 font-medium">{post.date}</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">{post.content}</p>
            <div className="flex items-center justify-between border-t border-gray-50 pt-5">
              <div className="flex items-center space-x-8">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-600 transition-colors">
                  <ThumbsUp size={18} />
                  <span className="text-xs font-bold uppercase tracking-wide">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageCircle size={18} />
                  <span className="text-xs font-bold uppercase tracking-wide">{post.comments} Comentarios</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-800 to-indigo-950 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-100 sticky top-24 border border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-white/20 p-2 rounded-xl">
              <Sparkles className="text-yellow-400" size={24} />
            </div>
            <h3 className="text-xl font-bold">Asistente Ceres AI</h3>
          </div>
          
          <p className="text-blue-100 text-sm mb-6 leading-relaxed">
            Realiza consultas sobre crianza y recibe consejos basados en expertos. Recuerda siempre validar con tu pediatra.
          </p>

          <div className="space-y-4">
            <div className="relative">
              <textarea 
                placeholder="Escribe tu consulta aquí..." 
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder-blue-300 outline-none min-h-[120px] resize-none focus:bg-white/20 transition-all text-sm"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
              />
              <button 
                onClick={handleAiAsk} 
                disabled={isAiLoading || !aiQuestion.trim()} 
                className="absolute right-4 bottom-4 bg-white text-blue-900 p-2.5 rounded-xl shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </div>

            {aiResponse && (
              <div className="bg-white/95 backdrop-blur-sm text-blue-950 rounded-2xl p-5 animate-fadeIn text-sm border border-blue-200/50 shadow-inner">
                <p className="leading-relaxed">{aiResponse}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex items-start space-x-3 text-[10px] text-blue-300 leading-tight">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <span>Información generada por inteligencia artificial. No reemplaza el consejo médico profesional.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
