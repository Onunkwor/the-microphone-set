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
        className="relative bg-cutout-yellow/20 p-8 border-2 border-dashed border-ink/20"
        style={{ transform: "rotate(0.3deg)" }}
      >
        <div className="text-center">
          <div
            className="inline-flex w-16 h-16 border-4 border-cutout-red rounded-full items-center justify-center mb-4"
            style={{ transform: "rotate(10deg)" }}
          >
            <CheckCircle className="w-8 h-8 text-cutout-red" />
          </div>
          <h3 className="font-display text-2xl text-ink mb-2">Perfect Score!</h3>
          <p className="font-body text-ink/60">
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
        <span
          className="inline-block bg-cutout-red text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-4"
          style={{ transform: "rotate(-1deg)" }}
        >
          Review
        </span>
        <h3 className="font-display text-2xl text-ink mb-2">Review Your Answers</h3>
        <p className="font-body text-ink/60">
          You got {correctCount} correct and missed {missedQuestions.length}.
          Let&apos;s learn from the ones you missed!
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
              className="bg-paper-white border-2 border-ink/10 overflow-hidden hover:border-ink/30 transition-all duration-300"
              style={{ transform: `rotate(${missedIndex % 2 === 0 ? -0.2 : 0.2}deg)` }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 text-left hover:bg-paper transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="inline-flex items-center gap-2 bg-cutout-red text-paper font-typewriter text-[10px] uppercase tracking-wider px-2.5 py-1"
                        style={{ transform: "rotate(-1deg)" }}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Question {index + 1}
                      </span>
                      {question.category && (
                        <span className="font-typewriter text-[10px] uppercase tracking-wider text-ink/40 px-2 py-0.5 border border-ink/10">
                          {question.category}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg text-ink">
                      {question.question}
                    </h4>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-ink/30 flex-shrink-0" />
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
                    <div className="px-6 pb-6 space-y-4 border-t-2 border-ink/10">
                      {/* Answer options */}
                      <div className="space-y-2 pt-4">
                        {question.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === question.correctAnswer;
                          const isUserAnswer = optionIndex === userAnswer;

                          return (
                            <div
                              key={optionIndex}
                              className={`p-4 border-2 ${
                                isCorrect
                                  ? "border-cutout-red bg-cutout-yellow/10"
                                  : isUserAnswer
                                  ? "border-ink/30 bg-ink/5"
                                  : "border-ink/10 bg-paper"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {isCorrect && (
                                  <CheckCircle className="w-5 h-5 text-cutout-red flex-shrink-0" />
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-ink/40 flex-shrink-0" />
                                )}
                                <span
                                  className={`flex-1 font-body ${
                                    isCorrect
                                      ? "text-ink font-medium"
                                      : isUserAnswer
                                      ? "text-ink/50"
                                      : "text-ink/40"
                                  }`}
                                >
                                  {option}
                                </span>
                                {isCorrect && (
                                  <span
                                    className="font-typewriter text-[9px] uppercase tracking-wider bg-cutout-red text-paper px-2 py-0.5"
                                    style={{ transform: "rotate(1deg)" }}
                                  >
                                    Correct
                                  </span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="font-typewriter text-[9px] uppercase tracking-wider text-ink/40 border border-ink/20 px-2 py-0.5">
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
                          className="bg-cutout-yellow/10 p-4 border-2 border-dashed border-ink/15"
                          style={{ transform: "rotate(-0.3deg)" }}
                        >
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-ink/60 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <h5 className="font-typewriter text-xs uppercase tracking-wider text-ink/60 mb-1">
                                Explanation
                              </h5>
                              <p className="font-body text-sm text-ink/70 leading-relaxed">
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
