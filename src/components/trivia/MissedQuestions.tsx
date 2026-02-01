import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import type { Trivia } from "@/services/api";

interface MissedQuestionsProps {
  questions: Trivia[];
  selectedAnswers: Record<number, number>;
}

export const MissedQuestions = ({ questions, selectedAnswers }: MissedQuestionsProps) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const missedQuestions = questions
    .map((q, index) => ({ question: q, index }))
    .filter(({ question, index }) => selectedAnswers[index] !== question.correctAnswer);

  const correctCount = questions.length - missedQuestions.length;

  if (missedQuestions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Perfect Score!</h3>
          <p className="text-gray-600">
            You answered all {questions.length} questions correctly. Outstanding!
          </p>
        </div>
      </motion.div>
    );
  }

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Answers</h3>
        <p className="text-gray-600">
          You got {correctCount} correct and missed {missedQuestions.length}.
          Let's learn from the ones you missed!
        </p>
      </div>

      <div className="space-y-4">
        {missedQuestions.map(({ question, index }, missedIndex) => {
          const isExpanded = expandedQuestions.has(index);
          const userAnswer = selectedAnswers[index];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: missedIndex * 0.1 }}
              className="rounded-2xl bg-white border border-red-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 text-left hover:bg-red-50/50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold">
                        <XCircle className="w-4 h-4" />
                        Question {index + 1}
                      </span>
                      {question.category && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                          {question.category}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {question.question}
                    </h4>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 border-t border-red-100">
                      {/* Answer options */}
                      <div className="space-y-2 pt-4">
                        {question.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === question.correctAnswer;
                          const isUserAnswer = optionIndex === userAnswer;

                          return (
                            <div
                              key={optionIndex}
                              className={`p-4 rounded-xl border-2 ${
                                isCorrect
                                  ? "border-green-500 bg-green-50"
                                  : isUserAnswer
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-200 bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {isCorrect && (
                                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                )}
                                <span
                                  className={`flex-1 font-medium ${
                                    isCorrect
                                      ? "text-green-900"
                                      : isUserAnswer
                                      ? "text-red-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {option}
                                </span>
                                {isCorrect && (
                                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                                    Correct Answer
                                  </span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {question.explanation && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-blue-50 rounded-xl p-4 border border-blue-200"
                        >
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <h5 className="font-semibold text-blue-900 mb-1">
                                Explanation
                              </h5>
                              <p className="text-sm text-blue-800 leading-relaxed">
                                {question.explanation}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
