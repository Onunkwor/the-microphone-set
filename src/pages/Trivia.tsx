import { useState, useEffect, useRef } from "react";
import { Share2, RotateCcw, Trophy, Copy, Facebook, ArrowRight, Loader2, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { triviaApi, leaderboardApi, type Trivia as TriviaType } from "@/services/api";
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
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Load saved name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('trivia_user_name');
    if (savedName) {
      setNameInput(savedName);
    }
  }, []);

  // Fetch questions from API with fallback
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await triviaApi.getRandom(8);
        if (data && data.length > 0) {
          // Store full TriviaType objects to preserve explanations
          setQuestions(data);
        } else {
          // Map fallback to TriviaType format
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

const getSnarkyComment = (percentage: number) => {
    const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    if (percentage === 100) {
      return pickRandom([
        "No cap, you absolutely ATE and left NO crumbs. It's giving musical genius with a PhD.",
        "Okay but this is lowkey unhinged?? You really said 'watch me be perfect' and DID THAT. Main character for real.",
        "It's giving 'I was born in a recording studio' energy. Highkey obsessed with this serve.",
        "Bestie you really thought you'd flex on us like this? And you DID?? Absolutely unhinged behavior, we stan.",
        "You're literally the blueprint. The moment. The icon. No notes, just pure perfection fr fr.",
        "Highkey terrifying how you ate every single question. Are you even real or just a music theory textbook with feelings?",
        "It's giving 'I have Spotify Premium and a music degree' vibes. Immaculate, no notes, chef's kiss.",
        "Lowkey scared of you now. You just violated this quiz in broad daylight. Absolutely feral excellence.",
        "No cap, you just gaslit the entire quiz into being easy. Delusional confidence that actually delivered.",
        "This is main character energy but make it TERRIFYING. You really understood every assignment and then some.",
      ]);
    }
    if (percentage >= 87.5) {
      return pickRandom([
        "Lowkey obsessed with how close you got. Highkey mad you fumbled at the finish line though bestie.",
        "It's giving 'almost perfect but still human' vibes. We see the vision, just squint a lil.",
        "You're so close to greatness it's actually unhinged. Like why stop NOW?? Main character who tripped at the end.",
        "No cap, you cooked but left the kitchen slightly messy. Still ate though, we're not gonna lie.",
        "This is giving 'I could've been perfect but chose chaos' energy. Honestly? Iconic behavior.",
        "Bestie you really said 'perfection is mid' and almost proved it wrong. So close it HURTS.",
        "Highkey impressed, lowkey devastated you missed ANY. The duality is unhinged.",
        "It's giving valedictorian energy with one B+ that haunts you forever. We get it.",
        "You're like 98% that witch but 2% just... forgot the spell? Still magical though bestie.",
        "No cap, this score is absolutely bussin' with just a HINT of delusion. Almost there legend.",
      ]);
    }
    if (percentage >= 75) {
      return pickRandom([
        "Solid but not spectacular, bestie. It's giving 'I know enough to be dangerous but not deadly.'",
        "Lowkey slayed, highkey could've tried harder. But you're comfortable with mediocrity and that's... a choice.",
        "You understood most of the assignment but definitely skipped the reading. B+ energy for real.",
        "It's giving 'I listen to music but don't STUDY it' vibes. Casual fan behavior, we see you.",
        "This is giving 'good enough' mentality. Not the serve, not the flop, just... there. Mid-tier icon.",
        "Bestie you ate most of it but left some CHUNKS on the plate. A little concerning ngl.",
        "Lowkey proud, highkey know you didn't try your hardest. Growth mindset or nah?",
        "Main character who skipped episodes 3, 7, and 11 but somehow followed the plot. Respect.",
        "It's giving 'I have a playlist but it's 30 songs on repeat.' Limited but confident.",
        "No cap, this is respectable but forgettable. You're in the group chat but not the main thread.",
      ]);
    }
    if (percentage >= 62.5) {
      return pickRandom([
        "It's giving... you TRIED and that's the kindest thing we can say rn. Participation trophy loaded.",
        "You thought you ate but bestie you barely TASTED. Main character delusion without the plot armor.",
        "Highkey expected better but we're being nice because you look fragile. This is mid with a capital MID.",
        "Not the serve you thought it was, but at least you showed up? The bar is on the FLOOR.",
        "Bestie this is giving 'I hit shuffle and pray' energy. Strategic guessing is NOT a personality trait.",
        "Lowkey embarrassing but we're manifesting growth for you. Thoughts and prayers fr.",
        "It's giving 'I recognize the chorus but that's IT' vibes. Surface level understanding only.",
        "You're the side character who THINKS they're the lead. The delusion is almost impressive bestie.",
        "No cap, you passed by a THREAD. It's giving 'phew I barely survived that' panic energy.",
        "Highkey need you to lock in and study. This is your wake-up call, are you AWAKE??",
      ]);
    }
    if (percentage >= 50) {
      return pickRandom([
        "Bestie... this is the DEFINITION of mid. Like textbook mediocrity, frame it and put it in a museum.",
        "You said 'I'll guess half' and actually DID. The audacity is unhinged but not in a good way.",
        "Lowkey tragic, highkey expected from someone with your energy. It's giving 'music is just noise.'",
        "Main character?? More like blurry background extra who doesn't even get a name. Humble yourself.",
        "It's giving 'I know vibes but ZERO facts' energy. Vibes don't count as knowledge, sorry.",
        "You're literally standing at the crossroads of knowing and being clueless. Pick a lane bestie.",
        "No cap, this is bare minimum effort. We're not mad, just disappointed. Actually we're a little mad.",
        "Highkey mediocre, lowkey sad to witness. Most people live here and that's the problem fr.",
        "It's giving 'I've HEARD of music' but never listened properly. Not the flex, please sit down.",
        "You really said 'coin flip odds' and lived that truth. Chaotic but make it EMBARRASSING.",
      ]);
    }
    if (percentage >= 37.5) {
      return pickRandom([
        "Oh no bestie... this is HIGHKEY embarrassing. It's giving 'what is music?' energy. Please.",
        "You flopped HARD and we're gonna dwell actually. Time to delete your Spotify and start over.",
        "It's giving 'I only know songs from TikTok ads' vibes. Unhinged ignorance fr fr.",
        "You really said 'music is just background noise' and PROVED it. The worst kind of correct.",
        "This is giving 'I heard a song once in 2019' energy. Bestie WHERE have you BEEN??",
        "Your music knowledge ghosted you. Actually it was never there to begin with, let's be honest.",
        "Lowkey terrified about your aux privileges. They're REVOKED, effective immediately bestie.",
        "No cap, this is giving 'I thought Beethoven was JUST a dog movie.' Help is available.",
        "It's giving NPC who stands in the corner with NO dialogue. Zero awareness, zero braincells.",
        "You're the person asking 'who's this?' every 10 seconds. We KNOW you are, it's obvious.",
      ]);
    }
    if (percentage >= 25) {
      return pickRandom([
        "OOF. It's giving 'I've never seen headphones in real life.' Lowkey devastating to witness.",
        "Bestie this is unhinged in the WORST way possible. Did you even TRY or just click random??",
        "No cap, this is a full-blown CRISIS. Your music knowledge needs life support STAT.",
        "Highkey concerning fr. It's giving 'raised by silent wolves in a basement' vibes. GET HELP.",
        "This is giving 'all songs sound identical to me' energy. That's... not normal bestie.",
        "You're the reason artists consider quitting. This score is VIOLENCE against music itself.",
        "Lowkey wanna make you a playlist. Highkey wanna send you to PRISON for this crime.",
        "It's giving 'I wear earbuds but never press play' behavior. WHAT are you even DOING??",
        "No cap, this is the villain origin story for every music teacher. You're the trauma.",
        "Bestie you didn't miss the mark, you're in a different DIMENSION. How did you get here?",
      ]);
    }
    return pickRandom([
      "HELP?? This is genuinely UNHINGED. Did you literally close your eyes, spin around, and tap randomly??",
      "Bestie... no cap, this might be the worst thing humanity has produced. It's giving NOTHING and I mean it.",
      "Lowkey calling the authorities rn. Highkey worried about your SAFETY. This is a musical CRIME SCENE.",
      "It's giving 'I thought music was invented yesterday' vibes. Touch grass, touch an album, touch SOMETHING.",
      "Main character energy?? You don't even get ELEVATOR music in your scenes. You're in silent film territory.",
      "This is giving 'I've never experienced joy from sound' behavior. Seek therapy AND a Spotify account IMMEDIATELY.",
      "No cap, you broke the quiz in the WORST way. Like illegally bad. The FBI should be involved.",
      "Bestie this score is a FELONY in 49 states. Highkey criminal behavior that cannot be forgiven.",
      "It's giving 'I thought Beyoncé was a CITY' energy. Please stop existing near music, PLEASE.",
      "You really asked 'what IS music?' and weren't joking. Unhinged doesn't cover this level of chaos.",
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
    // Calculate score client-side for immediate feedback
    let finalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);

    // Submit to backend for leaderboard
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
      // Continue to results even if submission fails
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
        {/* Confetti celebration for high scores */}
        {percentage >= 80 && <Confetti />}

        <div className="relative py-24 px-6 md:px-12">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-12">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
                <Mic2 className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-sm text-gray-600 font-medium">The Microphone Set</span>
              </div>
            </div>

            {/* Score Overview */}
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

            {/* Missed Questions Review */}
            <MissedQuestions questions={questions} selectedAnswers={selectedAnswers} />

            {/* Leaderboard Preview */}
            <LeaderboardPreview userRanking={userRanking} userName={userName} />

            {/* Explore more */}
            <div className="text-center">
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

  // Loading Screen
  if (isLoading) {
    return (
      <div className="bg-white text-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading trivia questions...</p>
        </div>
      </div>
    );
  }

  // Name Prompt Screen - shown before trivia starts
  if (showNamePrompt) {
    return (
      <div className="bg-white text-gray-900 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
              <Mic2 className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Music Trivia
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Ready to Test Your
              <br />
              <span className="text-[#3b82f6]">Music Knowledge?</span>
            </h1>

            <p className="text-gray-600">
              Answer {questions.length} questions and compete for a spot on the leaderboard!
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {localStorage.getItem('trivia_user_name') ? 'Welcome back!' : 'Enter Your Name'}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {localStorage.getItem('trivia_user_name')
                ? 'Confirm your name or enter a new one to continue.'
                : 'Your name will appear on the leaderboard.'}
            </p>

            <input
              type="text"
              placeholder="Your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#3b82f6] outline-none transition-colors mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNameConfirm();
                }
              }}
              maxLength={50}
              autoFocus
            />

            <Button
              onClick={handleNameConfirm}
              disabled={!nameInput.trim()}
              size="lg"
              className={`w-full rounded-full py-6 font-bold transition-all duration-300 ${
                nameInput.trim()
                  ? "bg-[#3b82f6] text-white hover:bg-[#2563eb] hover:shadow-[0_8px_30px_#3b82f640]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Start Trivia
            </Button>
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
              <Mic2 className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Playing as {userName}
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
