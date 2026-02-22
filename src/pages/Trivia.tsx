import { useState, useEffect, useRef } from "react";
import { Share2, RotateCcw, Trophy, Copy, Facebook, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const savedName = localStorage.getItem('trivia_user_name');
    if (savedName) {
      setNameInput(savedName);
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await triviaApi.getAll();
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

  // ===== RESULTS SCREEN =====
  if (isComplete) {
    return (
      <div className="bg-paper text-ink overflow-hidden min-h-screen">
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

              {/* Snarky comment */}
              <div
                className="bg-paper border-2 border-dashed border-ink/20 p-6 mb-8"
                style={{ transform: "rotate(0.3deg)" }}
              >
                <p className="font-quote italic text-lg text-ink/70 text-center leading-relaxed">
                  &ldquo;{getSnarkyComment(percentage)}&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={shareOnTwitter}
                    className="flex items-center justify-center gap-2 font-typewriter text-xs uppercase tracking-wider px-4 py-3 bg-ink text-paper border-2 border-ink hover:shadow-hard transition-all duration-200"
                  >
                    <Share2 className="w-4 h-4" />
                    Twitter
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="flex items-center justify-center gap-2 font-typewriter text-xs uppercase tracking-wider px-4 py-3 bg-cutout-red text-paper border-2 border-cutout-red hover:shadow-hard transition-all duration-200"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 font-typewriter text-xs uppercase tracking-wider px-4 py-3 bg-paper text-ink border-2 border-ink/20 hover:border-ink hover:shadow-hard transition-all duration-200"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>

                <button
                  onClick={resetQuiz}
                  className="w-full flex items-center justify-center gap-2 font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200"
                  style={{ transform: "rotate(-0.5deg)" }}
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
      <div className="bg-paper text-ink min-h-screen flex items-center justify-center">
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
      <div className="bg-paper text-ink min-h-screen flex items-center justify-center px-6">
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
      <div className="bg-paper text-ink min-h-screen flex items-center justify-center px-6">
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
              Answer {questions.length} questions and compete for a spot on the leaderboard!
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
    <div className="bg-paper text-ink overflow-hidden">
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
