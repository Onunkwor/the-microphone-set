import { useState, useEffect, useRef } from "react";
import { Music, Share2, RotateCcw, Trophy, Copy, Facebook } from "lucide-react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Button } from "@/components/ui/button";

const Trivia = () => {
  const [_, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [isComplete, setIsComplete] = useState(false);
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [visibleQuestion, setVisibleQuestion] = useState(0);
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const questions = [
    {
      question: "Which artist released the album 'Thriller' in 1982?",
      options: ["Prince", "Michael Jackson", "Madonna", "Whitney Houston"],
      correct: 1,
    },
    {
      question: "What does 'BPM' stand for in music?",
      options: [
        "Bass Per Minute",
        "Beats Per Minute",
        "Band Performance Measure",
        "Basic Playing Method",
      ],
      correct: 1,
    },
    {
      question: "Which band wrote 'Bohemian Rhapsody'?",
      options: ["Led Zeppelin", "The Beatles", "Queen", "Pink Floyd"],
      correct: 2,
    },
    {
      question: "What instrument did Jimi Hendrix famously play?",
      options: ["Piano", "Drums", "Bass", "Guitar"],
      correct: 3,
    },
    {
      question: "Which city is considered the birthplace of jazz?",
      options: ["Chicago", "New York", "New Orleans", "Memphis"],
      correct: 2,
    },
    {
      question: "What year was MTV launched?",
      options: ["1979", "1981", "1983", "1985"],
      correct: 1,
    },
    {
      question: "Which artist has won the most Grammy Awards?",
      options: ["Beyoncé", "Taylor Swift", "Adele", "Alison Krauss"],
      correct: 0,
    },
    {
      question: "What does 'LP' stand for in vinyl records?",
      options: [
        "Large Player",
        "Long Playing",
        "Limited Press",
        "Live Performance",
      ],
      correct: 1,
    },
  ];

  const getSnarkyComment = (percentage: any) => {
    if (percentage === 100)
      return "Perfect score! You're basically a walking music encyclopedia.";
    if (percentage >= 87.5)
      return "Excellent! Your music knowledge is seriously impressive.";
    if (percentage >= 75)
      return "Pretty good! You clearly know your music history.";
    if (percentage >= 62.5)
      return "Not bad, but there's room for improvement in your music knowledge.";
    if (percentage >= 50)
      return "Average performance. Time to expand those musical horizons?";
    if (percentage >= 37.5)
      return "Below average. Maybe stick to your favorite genre for now.";
    if (percentage >= 25)
      return "Rough results. Consider this a learning opportunity.";
    return "Yikes. Did you guess randomly? Time for a serious music education.";
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      questionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setVisibleQuestion(index);
          }
        }
      });
    };

    if (!isComplete) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Call once to set initial state
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showWelcome, isComplete]);

  const handleAnswerSelect = (questionIndex: any, answerIndex: any) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  // const handleStartQuiz = () => {
  //   if (userName.trim()) {
  //     setShowWelcome(false);
  //   }
  // };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setIsComplete(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers({});
    setIsComplete(false);
    setShowWelcome(true);
    setUserName("");
    setVisibleQuestion(0);
    window.scrollTo(0, 0);
  };

  const shareOnTwitter = () => {
    const percentage = Math.round((score / questions.length) * 100);
    const text = `I just scored ${score}/${questions.length} (${percentage}%) on The Microphone Set's Music Trivia! 🎵 Think you can beat me?`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(window.location.origin + "/trivia")}`;
    window.open(url, "_blank");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.origin + "/trivia"
    )}`;
    window.open(url, "_blank");
  };

  const copyToClipboard = () => {
    const percentage = Math.round((score / questions.length) * 100);
    const text = `I just scored ${score}/${questions.length} (${percentage}%) on The Microphone Set's Music Trivia! Can you beat me? ${window.location.origin}/trivia`;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const percentage = Math.round((score / questions.length) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;
  const canSubmit = answeredCount === questions.length;

  // Welcome Screen
  //   if (showWelcome) {
  //     return (
  //       <div className="min-h-screen bg-white">
  //         <div className="max-w-2xl mx-auto px-6 py-16">
  //           <div className="text-center mb-12">
  //             <div className="flex items-center justify-center gap-3 mb-6">
  //               <Music className="w-8 h-8 text-black" />
  //               <h1 className="text-3xl font-bold text-black">
  //                 The Microphone Set
  //               </h1>
  //             </div>
  //             <h2 className="text-xl text-gray-600 mb-8">
  //               Music Trivia Challenge
  //             </h2>
  //           </div>

  //           <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
  //             <div className="mb-6">
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 What's your name?
  //               </label>
  //               <input
  //                 type="text"
  //                 value={userName}
  //                 onChange={(e) => setUserName(e.target.value)}
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                 placeholder="Enter your name"
  //                 onKeyPress={(e) => e.key === "Enter" && handleStartQuiz()}
  //               />
  //             </div>

  //             <button
  //               onClick={handleStartQuiz}
  //               disabled={!userName.trim()}
  //               className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
  //             >
  //               Start Quiz
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  // Results Screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Music className="w-8 h-8 text-black" />
                <h1 className="text-3xl font-bold text-black">
                  The Microphone Set
                </h1>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff]  rounded-full mb-6">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Hi {userName}!
                </h2>
                <p className="text-gray-600 mb-6">Here are your results</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-black mb-4">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl font-bold text-gray-600 mb-6">
                  {percentage}%
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div
                    className="h-3 bg-black rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-lg text-gray-700 text-center">
                  {getSnarkyComment(percentage)}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    onClick={shareOnTwitter}
                    className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    onClick={shareOnFacebook}
                    className="bg-[#4267B2] hover:bg-[#365899] text-white"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="border-2"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                <Button
                  onClick={resetQuiz}
                  className="w-full gradient-bg-ocean text-white hover:opacity-90"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>

          <RetroGrid />
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white rounded-full px-4 py-2 mb-6">
            <Music className="w-5 h-5" />
            <span className="text-sm font-medium">Test Your Knowledge</span>
          </div>
          <h2 className="text-4xl font-bold text-black mb-3">
            Music Trivia <span className="gradient-ocean-text">Challenge</span>
          </h2>
          <p className="text-lg text-gray-600">
            Answer all {questions.length} questions to see your score
          </p>
          <div className="mt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span className="font-semibold">Progress:</span>
              <span>
                {answeredCount}/{questions.length} answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 max-w-md mx-auto">
              <div
                className="h-2 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full transition-all duration-300"
                style={{
                  width: `${(answeredCount / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-16">
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              ref={(el) => {
                questionRefs.current[questionIndex] = el;
              }}
              className={`transition-all duration-500 ${
                visibleQuestion === questionIndex
                  ? "opacity-100 scale-100"
                  : "opacity-30 blur-sm scale-95"
              }`}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover-lift">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full">
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                    {selectedAnswers[questionIndex] !== undefined && (
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        ✓ Answered
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {question.question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedAnswers[questionIndex] === optionIndex
                          ? "border-[#3b82f6] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={selectedAnswers[questionIndex] === optionIndex}
                        onChange={() =>
                          handleAnswerSelect(questionIndex, optionIndex)
                        }
                        className="mr-4 w-5 h-5 text-[#3b82f6] focus:ring-[#3b82f6]"
                      />
                      <span className="text-gray-900 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-16 text-center">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="bg-black text-white py-4 px-8 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {canSubmit
              ? "Submit Quiz"
              : `Answer ${questions.length - answeredCount} more questions`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trivia;
