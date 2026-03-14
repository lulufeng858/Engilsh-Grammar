/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { QUESTION_BANK, Question, Difficulty } from './types';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | '全部'>('全部');
  const [isFinished, setIsFinished] = useState(false);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return difficultyFilter === '全部' 
      ? QUESTION_BANK 
      : QUESTION_BANK.filter(q => q.difficulty === difficultyFilter);
  }, [difficultyFilter]);

  const currentQuestion = filteredQuestions[currentIndex];
  const progress = ((currentIndex + 1) / filteredQuestions.length) * 100;

  const handleOptionClick = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const handleSubmit = () => {
    if (!selectedAnswers[currentQuestion.id]) return;
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsSubmitted(false);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowExplanation(false);
    setIsFinished(false);
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const getEncouragement = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) return "完美！你真是个语法天才！🌟";
    if (ratio >= 0.8) return "太棒了！你的语法功底非常扎实！👏";
    if (ratio >= 0.6) return "不错哦！继续加油，你会更上一层楼！💪";
    return "别灰心，多看解析，下次一定会更好！📚";
  };

  if (isFinished) {
    const score = calculateScore();
    const total = filteredQuestions.length;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">练习完成!</h2>
          <div className="text-5xl font-black text-emerald-600 mb-4">
            {score} <span className="text-2xl text-slate-400">/ {total}</span>
          </div>
          <p className="text-slate-600 mb-8 text-lg italic">
            "{getEncouragement(score, total)}"
          </p>
          <button 
            onClick={handleReset}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
          >
            <RotateCcw className="w-5 h-5" />
            再练一次
          </button>
        </motion.div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-500 mb-4">当前难度暂无题目</p>
          <button onClick={() => setDifficultyFilter('全部')} className="text-emerald-600 font-bold">查看全部题目</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-bottom border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Grammar Master</h1>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value as any);
                setCurrentIndex(0);
                setIsSubmitted(false);
                setIsFinished(false);
              }}
              className="bg-slate-100 border-none rounded-full px-4 py-1.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              <option value="全部">全部难度</option>
              <option value="初级">初级</option>
              <option value="中级">中级</option>
              <option value="高级">高级</option>
            </select>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 w-full">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 sm:p-10">
              {/* Meta info */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {currentQuestion.category}
                </span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                  currentQuestion.difficulty === '初级' ? 'bg-blue-50 text-blue-700' :
                  currentQuestion.difficulty === '中级' ? 'bg-orange-50 text-orange-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="ml-auto text-slate-400 text-sm font-medium">
                  {currentIndex + 1} / {filteredQuestions.length}
                </span>
              </div>

              {/* Sentence Display */}
              <div className="mb-12">
                <p className="text-2xl sm:text-3xl font-medium leading-relaxed text-slate-800">
                  {currentQuestion.sentenceBefore}
                  <span className={`inline-block min-w-[120px] mx-2 border-b-2 text-center transition-all ${
                    isSubmitted 
                      ? (selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer 
                        ? 'text-emerald-600 border-emerald-600' 
                        : 'text-rose-600 border-rose-600')
                      : 'text-emerald-600 border-slate-300'
                  }`}>
                    {selectedAnswers[currentQuestion.id] || '______'}
                  </span>
                  {currentQuestion.sentenceAfter}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  
                  let buttonClass = "p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ";
                  
                  if (isSubmitted) {
                    if (isCorrect) {
                      buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                    } else if (isSelected) {
                      buttonClass += "border-rose-500 bg-rose-50 text-rose-700";
                    } else {
                      buttonClass += "border-slate-100 text-slate-300 opacity-50";
                    }
                  } else {
                    buttonClass += isSelected 
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-md" 
                      : "border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-slate-50";
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      disabled={isSubmitted}
                      className={buttonClass}
                    >
                      <span>{option}</span>
                      {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswers[currentQuestion.id]}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                      selectedAnswers[currentQuestion.id]
                        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    提交答案
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setShowExplanation(true)}
                      className="flex-1 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Info className="w-5 h-5" />
                      查看详解
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
                    >
                      {currentIndex === filteredQuestions.length - 1 ? "完成练习" : "下一题"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Explanation Modal */}
      <AnimatePresence>
        {showExplanation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExplanation(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                    语法详解
                  </h3>
                  <button 
                    onClick={() => setShowExplanation(false)}
                    className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">正确答案</h4>
                    <p className="text-xl font-bold text-emerald-600 bg-emerald-50 inline-block px-4 py-2 rounded-xl">
                      {currentQuestion.explanation.correctAnswer}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">语法规则</h4>
                    <p className="text-slate-700 leading-relaxed">
                      {currentQuestion.explanation.rule}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">典型例句</h4>
                    <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-emerald-500 italic text-slate-600">
                      "{currentQuestion.explanation.example}"
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">常见错误辨析</h4>
                    <p className="text-slate-700">
                      {currentQuestion.explanation.commonMistake}
                    </p>
                  </section>

                  {currentQuestion.explanation.reviewLink && (
                    <a 
                      href={currentQuestion.explanation.reviewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline mt-4"
                    >
                      相关语法复习 <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button 
                  onClick={() => setShowExplanation(false)}
                  className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
