import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  console.log(location);

  const navItems = [
    {
      name: "Playlists",
      link: "#features",
    },
    {
      name: "Blogs",
      link: "#pricing",
    },
    {
      name: "Interviews",
      link: "#contact",
    },
    {
      name: "Recommendations",
      link: "#contact",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];
  return (
    <>
      {location.pathname === "/" && (
        <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            🎤 Think you know lyrics? Prove it in our{" "}
            <strong>Trivia Challenge</strong> —{" "}
            <a
              href="/trivia"
              className="transition duration-200 hover:underline"
            >
              Play now
            </a>
          </p>
        </StickyBanner>
      )}

      <div className="relative w-full mt-5">
        <Navbar>
          <NavBody className="cursor-pointer">
            <Link to="/" className="flex items-center mb-4 md:mb-0 z-70">
              <div className="font-sans text-xl md:text-2xl flex items-center">
                <span className="font-light tracking-tight">The</span>
                <span className="mx-1 font-black tracking-tighter">
                  MICROPHONE
                </span>
                <div className="w-2 h-2 bg-black rounded-full mx-1"></div>
                <span className="font-medium">SET</span>
              </div>
            </Link>
            <NavItems items={navItems} />
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <Link to="/" className="flex items-center mb-4 md:mb-0">
                <div className="font-sans text-xl md:text-2xl flex items-center">
                  <span className="font-light tracking-tight">the</span>
                  <span className="mx-1 font-black tracking-tighter">
                    MICROPHONE
                  </span>
                  <div className="w-2 h-2 bg-black rounded-full mx-1"></div>
                  <span className="font-medium">SET</span>
                </div>
              </Link>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
