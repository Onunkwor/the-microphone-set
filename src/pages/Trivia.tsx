import { useState, useEffect, useRef } from "react";
import { Music, Share2, RotateCcw, Trophy, Copy, Facebook, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Trivia = () => {
  const [_, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
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

  const getSnarkyComment = (percentage: number) => {
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
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showWelcome, isComplete]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

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
    const text = `I just scored ${score}/${questions.length} (${percentage}%) on The Microphone Set's Music Trivia! Think you can beat me?`;
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

  // Results Screen
  if (isComplete) {
    return (
      <div className="bg-white text-gray-900 overflow-hidden min-h-screen">
        <div className="relative py-24 px-6 md:px-12">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
                <Music className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-sm text-gray-600 font-medium">The Microphone Set</span>
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[#3b82f6] flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hi {userName || "there"}!
                </h2>
                <p className="text-gray-500">Here are your results</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl font-bold text-[#3b82f6] mb-6">
                  {percentage}%
                </div>

                <div className="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
                  <div
                    className="h-3 bg-[#3b82f6] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                  {getSnarkyComment(percentage)}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    onClick={shareOnTwitter}
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    onClick={shareOnFacebook}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-full"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="border-2 border-gray-200 rounded-full hover:border-[#3b82f6] hover:text-[#3b82f6]"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                <Button
                  onClick={resetQuiz}
                  size="lg"
                  className="w-full bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full py-6 font-semibold transition-all duration-300 hover:shadow-[0_8px_30px_#3b82f640]"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>

            {/* Explore more */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-4">Want to discover more music?</p>
              <Link
                to="/recommendations"
                className="inline-flex items-center gap-2 text-[#3b82f6] font-semibold hover:gap-4 transition-all duration-300"
              >
                Get Personalized Recommendations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
              <Music className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Test Your Knowledge
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[0.95] tracking-tight text-gray-900 mb-4">
              Music Trivia
              <br />
              <span className="text-[#3b82f6]">Challenge</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Answer all {questions.length} questions to see your score
            </p>

            {/* Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span className="font-medium">Progress</span>
                <span>{answeredCount}/{questions.length} answered</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-[#3b82f6] rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-2xl mx-auto space-y-12">
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              ref={(el) => {
                questionRefs.current[questionIndex] = el;
              }}
              className={`transition-all duration-500 ${
                visibleQuestion === questionIndex
                  ? "opacity-100 scale-100"
                  : "opacity-40 blur-[2px] scale-[0.98]"
              }`}
            >
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-semibold">
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                    {selectedAnswers[questionIndex] !== undefined && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
                        Answered
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {question.question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedAnswers[questionIndex] === optionIndex
                          ? "border-[#3b82f6] bg-[#3b82f6]/5"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={selectedAnswers[questionIndex] === optionIndex}
                        onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                        className="mr-4 w-5 h-5 text-[#3b82f6] focus:ring-[#3b82f6] accent-[#3b82f6]"
                      />
                      <span className="text-gray-900 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Button */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            size="lg"
            className={`rounded-full px-10 py-7 text-lg font-bold transition-all duration-300 ${
              canSubmit
                ? "bg-[#3b82f6] text-white hover:bg-[#2563eb] hover:scale-105 hover:shadow-[0_8px_30px_#3b82f640]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {canSubmit
              ? "Submit Quiz"
              : `Answer ${questions.length - answeredCount} more questions`}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Trivia;
