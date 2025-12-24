
import React, { useState } from 'react';
import { CommunityPost } from '../types';
import { MessageCircle, ThumbsUp, Share2, Sparkles, Send, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface CommunityProps {
  posts: CommunityPost[];
}

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
      console.error(error);
      setAiResponse("Lo siento, tengo problemas para conectarme con mi cerebro de experto ahora mismo. ¡Por favor, inténtalo de nuevo más tarde!");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeIn">
      {/* Feed Principal */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          Charlas Recientes
          <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-pink-200 to-transparent rounded-full"></div>
        </h2>
        
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-pink-200 transition-colors group">
            <div className="flex items-center space-x-3 mb-4">
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-bold text-gray-800">{post.author}</h4>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">{post.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="bg-pink-50 text-pink-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">#{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-1 text-gray-400 hover:text-pink-500 transition-colors">
                  <ThumbsUp size={18} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-500 transition-colors">
                  <MessageCircle size={18} />
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Barra Lateral: Asesor AI */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 sticky top-24">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-white/20 p-2 rounded-xl">
              <Sparkles className="text-yellow-300" size={24} />
            </div>
            <h3 className="text-xl font-bold">Asesor de Crianza</h3>
          </div>
          
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
            ¿Necesitas consejo sobre sueño, alimentación o un poco de apoyo? ¡Pregunta a nuestro mentor AI!
          </p>

          <div className="space-y-4">
            <div className="relative">
              <textarea 
                placeholder="Pregunta lo que sea..." 
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/40 min-h-[100px] resize-none"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
              />
              <button 
                onClick={handleAiAsk}
                disabled={isAiLoading || !aiQuestion.trim()}
                className="absolute right-3 bottom-3 bg-white text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAiLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </div>

            {aiResponse && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 animate-fadeIn">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">Respuesta del Asesor</span>
                </div>
                <p className="text-sm leading-relaxed text-indigo-50">
                  {aiResponse}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i + 10}/30/30`} alt="Active" className="w-8 h-8 rounded-full border-2 border-indigo-700" />
              ))}
            </div>
            <span className="text-[10px] text-indigo-200 font-medium uppercase tracking-widest">324 Padres en Línea</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
