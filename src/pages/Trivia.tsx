import { useState, useEffect, useRef } from "react";
import { Share2, RotateCcw, Trophy, ArrowRight, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { quizApi, leaderboardApi, type Trivia as TriviaType } from "@/services/api";
import { MissedQuestions } from "@/components/trivia/MissedQuestions";
import { LeaderboardPreview } from "@/components/trivia/LeaderboardPreview";
import { Confetti } from "@/components/trivia/Confetti";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const fallbackQuestions: Question[] = [
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

const Trivia = () => {
  const [_, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [visibleQuestion, setVisibleQuestion] = useState(0);
  const [questions, setQuestions] = useState<TriviaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId] = useState(() => `${Date.now()}-${Math.random().toString(36).substring(2)}`);
  const [userRanking, setUserRanking] = useState<number>();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shareCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('trivia_user_name');
    if (savedName) {
      setNameInput(savedName);
    }
  }, []);

  // Prevent copying, screenshots, and right-click
  useEffect(() => {
    const preventCopy = (e: ClipboardEvent) => e.preventDefault();
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();
    const preventKeyShortcuts = (e: KeyboardEvent) => {
      // Block PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault();
      }
      // Block Ctrl/Cmd + C, A, U, S, P
      if ((e.ctrlKey || e.metaKey) && ["c", "a", "u", "s", "p"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCopy);
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventKeyShortcuts);

    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCopy);
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventKeyShortcuts);
    };
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { questions: data } = await quizApi.getLive();
        if (data && data.length > 0) {
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setQuestions(shuffled);
        } else {
          const mappedFallback: TriviaType[] = fallbackQuestions.map((q, i) => ({
            _id: `fallback-${i}`,
            question: q.question,
            options: q.options,
            correctAnswer: q.correct,
            category: 'general',
            difficulty: 'medium',
            explanation: 'This is a fallback question.',
            active: true,
          }));
          setQuestions(mappedFallback);
        }
      } catch (error) {
        console.log("Using fallback questions:", error);
        const mappedFallback: TriviaType[] = fallbackQuestions.map((q, i) => ({
          _id: `fallback-${i}`,
          question: q.question,
          options: q.options,
          correctAnswer: q.correct,
          category: 'general',
          difficulty: 'medium',
          explanation: 'This is a fallback question.',
          active: true,
        }));
        setQuestions(mappedFallback);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const getResultComment = (percentage: number) => {
    const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    if (percentage === 100) {
      return pickRandom([
        "Perfect score! You know your music inside and out — every single answer on point. Take a bow. 🎶",
        "Flawless run! Not a single note out of place. You're the real deal.",
        "Absolute perfection. Your ears deserve a standing ovation. 👏",
        "100%! You didn't just pass — you aced every beat. Music genius confirmed.",
        "Spotless. Every answer nailed. This is what mastery sounds like. 🏆",
        "You swept the whole thing! Encyclopedic taste, and it shows. Bravo.",
      ]);
    }
    if (percentage >= 87.5) {
      return pickRandom([
        "So close to perfect! Just a note or two off — seriously impressive stuff. 🎧",
        "Outstanding score! You clearly know your music. A tiny stumble, but wow.",
        "Almost flawless! You've got a fantastic ear — just a couple slipped by.",
        "Brilliant run! One or two got away, but this is top-tier knowledge.",
        "You're at the top of the class! A hair from perfect. Beautifully done.",
        "Nearly aced it! Your music knowledge is genuinely excellent. 🌟",
      ]);
    }
    if (percentage >= 75) {
      return pickRandom([
        "Great job! You clearly know your stuff — a really solid score. 🎵",
        "Strong showing! You've got a good ear and it paid off. Nicely done.",
        "Well played! You know your music well. A few tricky ones, but a great result.",
        "Solid score! You're a real music fan and it shows. Keep it up.",
        "Nice work! You handled most of that with ease. Impressive listening.",
        "A strong result — clearly you've been paying attention to the music. 👏",
      ]);
    }
    if (percentage >= 62.5) {
      return pickRandom([
        "Good effort! You know more than most — a respectable score. 🎧",
        "Nice going! You got the majority right. A little more listening and you'll be unstoppable.",
        "Not bad at all! You've got a decent handle on this. Keep exploring.",
        "Decent score! You clearly enjoy music — a few more spins and you'll level up.",
        "Well done! You held your own. There's more to discover, and that's the fun part.",
        "Solid try! You're on the right track — keep the tunes coming. 🎶",
      ]);
    }
    if (percentage >= 50) {
      return pickRandom([
        "Halfway there! A fair start — plenty of great music left to discover. 🎵",
        "Good attempt! You got a bunch right. Keep listening and you'll climb fast.",
        "Not bad! You're building your music knowledge — every quiz makes you sharper.",
        "You held steady at the halfway mark. A whole world of music is waiting for you.",
        "Nice try! A solid middle-of-the-pack score. Run it back and beat it. 🎧",
        "You're getting there! Keep the playlists rolling and watch your score rise.",
      ]);
    }
    if (percentage >= 37.5) {
      return pickRandom([
        "Nice try! Music's a big world — this is a great excuse to explore more. 🎶",
        "Good on you for playing! A few more listening sessions and you'll surprise yourself.",
        "You gave it a shot! Every song you hear from here makes you better. Keep going.",
        "Room to grow, and that's exciting! Discover a few new artists and come back. 🎧",
        "Not your best round, but now you know what to dig into next. Have fun with it.",
        "Keep at it! The best part of music is there's always more to find.",
      ]);
    }
    if (percentage >= 25) {
      return pickRandom([
        "Hey, everyone starts somewhere! The fun's in the discovery — keep listening. 🎧",
        "Early days! Put on some new tunes and give it another go. You'll improve fast.",
        "No worries — music's a journey. Explore a little and run it back. 🎵",
        "That's alright! Every music lover was new once. Keep those ears open.",
        "Plenty of room to grow, and honestly, that's the fun part. Come back soon!",
        "You showed up and played — that's step one. Now go find some new favorites.",
      ]);
    }
    return pickRandom([
      "Hey, everyone starts somewhere! The fun's in the discovery — keep listening and come back stronger. 🎧",
      "Tough round, but no biggie! There's a whole world of music to fall in love with. 🎵",
      "Don't sweat it — this is just the start. Queue up some tunes and try again.",
      "It happens! The good news? So much great music to discover from here. 🎧",
      "Everyone's got a first quiz. Explore a few new artists and give it another spin!",
      "No shame in a rough start — even the pros were beginners once. Keep going. 🌟",
    ]);
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

    if (!isComplete && !showNamePrompt) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showNamePrompt, isComplete]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleSubmit = async () => {
    let finalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);

    try {
      const answers = questions.map((question, index) => ({
        questionId: question._id!,
        selectedAnswer: selectedAnswers[index],
      }));

      const result = await leaderboardApi.submit({
        userName: userName.trim(),
        answers,
        sessionId,
      });

      setUserRanking(result.ranking);
    } catch (error) {
      console.error("Failed to submit score:", error);
    }

    setIsComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNameConfirm = () => {
    if (!nameInput.trim()) return;
    const trimmedName = nameInput.trim();
    setUserName(trimmedName);
    localStorage.setItem('trivia_user_name', trimmedName);
    setShowNamePrompt(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers({});
    setIsComplete(false);
    setShowNamePrompt(true);
    setVisibleQuestion(0);
    window.scrollTo(0, 0);
  };

  const shareAsImage = async () => {
    if (!shareCardRef.current) return;
    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#f5f0e8",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "my-trivia-result.png", { type: "image/png" });
        const shareText = `I scored ${score}/${questions.length} (${percentage}%) on The Microphone Set Music Trivia! Can you beat me? ${window.location.origin}/trivia`;

        // Try native share (mobile) first
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: shareText });
        } else {
          // Fallback: download the image
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "my-trivia-result.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (err) {
      console.error("Failed to generate image:", err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const percentage = Math.round((score / questions.length) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;
  const canSubmit = answeredCount === questions.length;

  // ===== RESULTS SCREEN =====
  if (isComplete) {
    return (
      <div className="bg-paper text-ink overflow-hidden min-h-screen select-none">
        {percentage >= 80 && <Confetti />}

        <div className="relative py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center">
              <span
                className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6"
                style={{ transform: "rotate(-2deg)" }}
              >
                Quiz Complete
              </span>
            </div>

            {/* Score Card */}
            <div
              ref={shareCardRef}
              className="relative bg-paper-white p-8 md:p-10 border-2 border-ink/10 shadow-hard"
              style={{ transform: "rotate(-0.3deg)" }}
            >
              {/* Tape strips */}
              <div className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] left-8 z-10" style={{ transform: "rotate(-3deg)" }} />
              <div className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] right-12 z-10" style={{ transform: "rotate(2deg)" }} />

              <div className="text-center mb-8">
                <div
                  className="inline-flex w-20 h-20 border-4 border-cutout-red rounded-full items-center justify-center mb-6"
                  style={{ transform: "rotate(10deg)" }}
                >
                  <Trophy className="w-10 h-10 text-cutout-red" />
                </div>
                <h2 className="font-display text-3xl text-ink mb-2">
                  Hi {userName || "there"}!
                </h2>
                <p className="font-body text-ink/50">Here are your results</p>
              </div>

              <div className="text-center mb-8">
                <div className="font-display text-7xl text-ink mb-2">
                  {score}/{questions.length}
                </div>
                <div
                  className="inline-block bg-cutout-red text-paper font-typewriter text-2xl px-4 py-1 mb-6"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  {percentage}%
                </div>

                {/* Progress bar */}
                <div className="w-full bg-ink/10 h-3 mb-6 overflow-hidden border border-ink/20">
                  <div
                    className="h-3 bg-cutout-red transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Result comment */}
              <div
                className="bg-paper border-2 border-dashed border-ink/20 p-6 mb-8"
                style={{ transform: "rotate(0.3deg)" }}
              >
                <p className="font-quote italic text-lg text-ink/70 text-center leading-relaxed">
                  &ldquo;{getResultComment(percentage)}&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={shareAsImage}
                  disabled={isGeneratingImage}
                  className={`w-full flex items-center justify-center gap-2 font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 border-[3px] transition-all duration-200 ${
                    isGeneratingImage
                      ? "bg-ink/30 text-paper/50 border-ink/30 cursor-not-allowed"
                      : "bg-cutout-red text-paper border-cutout-red shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5"
                  }`}
                  style={{ transform: "rotate(-0.5deg)" }}
                >
                  {isGeneratingImage ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Share2 className="w-5 h-5" />
                  )}
                  {isGeneratingImage ? "Generating..." : "Share Result"}
                </button>

                <button
                  onClick={resetQuiz}
                  className="w-full flex items-center justify-center gap-2 font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200"
                  style={{ transform: "rotate(0.5deg)" }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
              </div>
            </div>

            {/* Missed Questions Review */}
            <MissedQuestions questions={questions} selectedAnswers={selectedAnswers} />

            {/* Leaderboard Preview */}
            <LeaderboardPreview userRanking={userRanking} userName={userName} />

            {/* Explore more */}
            <div className="text-center">
              <p className="font-body text-ink/50 mb-4">Want to discover more music?</p>
              <Link
                to="/recommendations"
                className="inline-flex items-center gap-2 font-typewriter text-sm uppercase tracking-wider text-cutout-red hover:gap-4 transition-all duration-300 no-underline"
              >
                Get Recommendations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== LOADING SCREEN =====
  if (isLoading) {
    return (
      <div className="bg-paper text-ink min-h-screen flex items-center justify-center select-none">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-ink animate-spin mx-auto mb-4" />
          <p className="font-typewriter text-sm uppercase tracking-wider text-ink/60">Loading questions...</p>
        </div>
      </div>
    );
  }

  // ===== NO TRIVIA AVAILABLE =====
  if (questions.length === 0) {
    return (
      <div className="bg-paper text-ink min-h-screen flex items-center justify-center px-6 select-none">
        <div className="max-w-md w-full text-center">
          <div
            className="relative bg-paper-white p-10 border-2 border-ink/10"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <div className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] left-8 z-10" style={{ transform: "rotate(-2deg)" }} />

            <div
              className="inline-flex w-20 h-20 border-4 border-ink/20 rounded-full items-center justify-center mb-6"
              style={{ transform: "rotate(10deg)" }}
            >
              <span className="text-3xl">🎤</span>
            </div>

            <h2 className="font-display text-3xl text-ink mb-3">
              No Trivia Available
            </h2>
            <p className="font-body text-ink/50 mb-8">
              There are no trivia questions available right now. Check back later for new challenges!
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== NAME PROMPT SCREEN =====
  if (showNamePrompt) {
    return (
      <div className="bg-paper text-ink min-h-screen flex items-center justify-center px-6 select-none">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <span
              className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6"
              style={{ transform: "rotate(-2deg)" }}
            >
              Music Trivia
            </span>

            <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
              Ready to Test
              <br />
              <span
                className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                Your Knowledge?
              </span>
            </h1>

            <p className="font-body text-ink/60">
              Test your music knowledge and compete for a spot on the leaderboard!
            </p>
          </div>

          <div
            className="relative bg-paper-white p-8 border-2 border-ink/10"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {/* Tape */}
            <div className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] left-8 z-10" style={{ transform: "rotate(-2deg)" }} />

            <h3 className="font-display text-xl text-ink mb-2">
              {localStorage.getItem('trivia_user_name') ? 'Welcome back!' : 'Enter Your Name'}
            </h3>
            <p className="font-body text-sm text-ink/50 mb-4">
              {localStorage.getItem('trivia_user_name')
                ? 'Confirm your name or enter a new one to continue.'
                : 'Your name will appear on the leaderboard.'}
            </p>

            <input
              type="text"
              placeholder="Your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-4 py-3 bg-paper border-2 border-ink/20 font-body text-sm focus:outline-none focus:border-cutout-red transition-colors mb-4 placeholder:text-ink/20"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNameConfirm();
                }
              }}
              maxLength={50}
              autoFocus
            />

            <button
              onClick={handleNameConfirm}
              disabled={!nameInput.trim()}
              className={`w-full font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 border-[3px] transition-all duration-200 ${
                nameInput.trim()
                  ? "bg-ink text-paper border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 cursor-pointer"
                  : "bg-ink/20 text-ink/40 border-ink/20 cursor-not-allowed"
              }`}
              style={{ transform: "rotate(-0.5deg)" }}
            >
              Start Trivia
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== QUIZ SCREEN =====
  return (
    <div className="bg-paper text-ink overflow-hidden select-none">
      {/* Hero */}
      <section className="pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="inline-block bg-cutout-yellow text-ink font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6"
            style={{ transform: "rotate(-2deg)" }}
          >
            Playing as {userName}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-ink mb-4">
            Music Trivia
            <br />
            <span
              className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              Challenge
            </span>
          </h1>

          <p className="font-body text-lg text-ink/60 mb-8">
            Answer all {questions.length} questions to see your score
          </p>

          {/* Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between font-typewriter text-xs uppercase tracking-wider text-ink/50 mb-2">
              <span>Progress</span>
              <span>{answeredCount}/{questions.length} answered</span>
            </div>
            <div className="w-full bg-ink/10 h-2 overflow-hidden border border-ink/10">
              <div
                className="h-2 bg-cutout-red transition-all duration-300"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {questions.map((question, questionIndex) => (
            <motion.div
              key={questionIndex}
              ref={(el) => {
                questionRefs.current[questionIndex] = el;
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (questionIndex % 3) * 0.1 }}
              className={`transition-all duration-500 ${
                visibleQuestion === questionIndex
                  ? "opacity-100 scale-100"
                  : "opacity-40 blur-[2px] scale-[0.98]"
              }`}
            >
              <div
                className="relative bg-paper-white p-6 md:p-8 border-2 border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-300"
                style={{ transform: `rotate(${questionIndex % 2 === 0 ? -0.3 : 0.3}deg)` }}
              >
                {/* Tape */}
                <div
                  className="absolute w-12 h-3.5 bg-cutout-yellow/70 top-[-7px] left-6 z-10"
                  style={{ transform: `rotate(${questionIndex % 2 === 0 ? 2 : -2}deg)` }}
                />

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-block bg-ink text-paper font-typewriter text-[10px] uppercase tracking-wider px-2.5 py-1"
                      style={{ transform: "rotate(-1deg)" }}
                    >
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                    {selectedAnswers[questionIndex] !== undefined && (
                      <span
                        className="inline-block bg-cutout-red text-paper font-typewriter text-[10px] uppercase tracking-wider px-2.5 py-1"
                        style={{ transform: "rotate(1deg)" }}
                      >
                        Answered
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-ink">
                    {question.question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-4 border-2 cursor-pointer transition-all duration-200 ${
                        selectedAnswers[questionIndex] === optionIndex
                          ? "border-cutout-red bg-cutout-red/5"
                          : "border-ink/10 hover:border-ink/30 hover:bg-paper"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={selectedAnswers[questionIndex] === optionIndex}
                        onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                        className="mr-4 w-4 h-4 accent-[#e63946]"
                      />
                      <span className="font-body text-sm text-ink">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Submit Button */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`font-typewriter text-sm uppercase tracking-[2px] px-10 py-5 border-[3px] transition-all duration-300 ${
              canSubmit
                ? "bg-ink text-paper border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 cursor-pointer"
                : "bg-ink/20 text-ink/40 border-ink/20 cursor-not-allowed"
            }`}
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {canSubmit
              ? "Submit Quiz"
              : `Answer ${questions.length - answeredCount} more questions`}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Trivia;
