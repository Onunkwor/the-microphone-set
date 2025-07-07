<section className="relative overflow-hidden py-24 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
  {/* Enhanced abstract decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
    <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-8 border-black"></div>
    <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full border-4 border-black"></div>
    <div className="absolute top-40 right-10 w-20 h-20 bg-black rounded-full"></div>
    <div className="absolute bottom-40 left-40 w-96 h-2 bg-black rounded-full transform rotate-45"></div>
    <div className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-black rounded-full"></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left content column - slightly adjusted spacing */}
      <div className="space-y-8">
        <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium">
          <span className="flex items-center">
            <Music className="h-4 w-4 mr-2" />
            Music discovery reimagined
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Discover Your Next
          <span className="relative mx-3">
            <span className="relative z-10">Favorite</span>
            <span
              className="absolute bottom-1 left-0 w-full"
              style={{
                height: "10px",
                background:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' width='100%25' height='100%25' preserveAspectRatio='none'%3E%3Cpath d='M0,5 Q10,2 15,5 T30,5 T45,5 T60,5 T75,5 T90,5 T100,5' stroke='black' stroke-opacity='0.2' stroke-width='6' fill='none' stroke-linecap='round' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E\")",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            ></span>
          </span>
          Sound
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-lg">
          We talk about music, share playlists, interview artists, and help you
          discover new sounds that resonate with your soul.
        </p>

        <div className="flex gap-4">
          <Button
            asChild
            size="lg"
            className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-6"
          >
            <Link to="/playlists">
              <Headphones className="mr-2 h-5 w-5" />
              Explore Playlists
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-black text-black hover:bg-black/5 rounded-full px-8 py-6"
          >
            <Link to="/blog">
              <Book className="mr-2 h-5 w-5" />
              Read Articles
            </Link>
          </Button>
        </div>
      </div>

      {/* Right visual column - improved audio visualization */}
      <div className="hidden relative lg:block">
        <div className="aspect-square max-w-lg mx-auto relative">
          {/* Enhanced circular background with gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/5 to-black/10"></div>

          {/* Improved Audio waveform visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-end justify-center w-full h-full">
              {/* Center circle for visual anchor */}
              <div className="absolute w-24 h-24 rounded-full bg-black/5 z-0"></div>

              {/* Circular waveform (new addition) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full flex items-center justify-center">
                  {Array.from({ length: 36 }).map((_, index) => (
                    <div
                      key={`circular-${index}`}
                      className="absolute w-1 bg-black/40 rounded-full"
                      style={{
                        height: `${20 + Math.random() * 15}px`,
                        transform: `rotate(${
                          index * 10
                        }deg) translateY(-120px)`,
                        animation: `pulseCircular ${
                          Math.random() * 1 + 0.5
                        }s ease-in-out infinite alternate`,
                        animationDelay: `${index * 0.02}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Microphone illustration - repositioned */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Mic
              className="w-32 h-32 md:w-40 md:h-40 text-black opacity-70"
              strokeWidth={1.5}
            />
          </div>

          {/* Play button - improved positioning and style */}
          <div className="absolute bottom-6 right-6 bg-black text-white rounded-full p-4 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
            <Play className="h-8 w-8 fill-current" />
          </div>
        </div>

        {/* Enhanced featured genres bubbles with better positioning */}
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white border-2 border-black/10 flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-medium">Jazz</span>
        </div>
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white border-2 border-black/10 flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-medium">Hip-Hop</span>
        </div>
        <div className="absolute top-1/2 -right-10 w-24 h-24 rounded-full bg-white border-2 border-black/10 flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-medium">Electronic</span>
        </div>
        {/* New genre bubble */}
        <div className="absolute bottom-1/3 -left-8 w-18 h-18 rounded-full bg-white border-2 border-black/10 flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-medium">Rock</span>
        </div>
      </div>
    </div>
  </div>

  {/* Enhanced CSS Animations */}
  <style>{`
    @keyframes pulseWave {
      0% {
        height: 30%;
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
      100% {
        height: 100%;
        opacity: 0.9;
      }
    }
    
    @keyframes pulseCircular {
      0% {
        height: 15px;
        opacity: 0.5;
      }
      100% {
        height: 30px;
        opacity: 0.8;
      }
    }
  `}</style>
</section>;
