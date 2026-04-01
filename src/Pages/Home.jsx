import React, { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Certified MSME
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Assistant
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"} transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-3" aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Finance", "Marketing Enthusiast"];
// const TECH_STACK = ["React", "Javascript", "Laravel", "PHP", "Tailwind"];
const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/junjunabdinurrahman",
    label: "LinkedIn Profile",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/junjun.abdii/",
    label: "Instagram Profile",
  },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Helmet>
        <title>Junjun Abdi Nurrahman</title>
        <meta
          name="description"
          content="Website resmi Junjun Abdi Nurahman, Certified MSME Assistant. Saya berfokus pada pemberdayaan UMKM melalui bimbingan keuangan dan pengembangan bisnis."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://junjunabdinurrahman.com" />
        <meta
          property="og:title"
          content="Junjun Abdi Nurrahman — Certified MSME Assistant"
        />
        <meta
          property="og:description"
          content="Website resmi Junjun Abdi Nurrahman, Certified MSME Assistant yang berfokus pada pemberdayaan UMKM."
        />
        <meta property="og:url" content="https://junjunabdinurrahman.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Junjun Abdi Nurahman",
            "jobTitle": "Certified MSME Assistant",
            "url": "https://junjunabdinurrahman.com",
            "sameAs": [
              "https://www.linkedin.com/in/junjunabdinurrahman",
              "https://www.instagram.com/junjun.abdii/"
            ]
          }
        `}</script>
      </Helmet>

      <div
        className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]"
        id="Home"
      >
        <div
          className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="container mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
              {/* Left Column */}
              <div
                className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="space-y-4 sm:space-y-6">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect */}
                  <div
                    className="h-8 flex items-center"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                      {text}
                    </span>
                    <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000"
                  >
                    "Empowering Small Businesses Through Financial Guidance and Business Development"
                  </p>

                  {/* Tech Stack */}
                  <div
                    className="flex flex-wrap gap-3 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >
                  </div>

                  {/* CTA Buttons */}
                  <div
                    className="flex flex-row gap-3 w-full justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    <CTAButton
                      href="#Portofolio"
                      text="Projects"
                      icon={ExternalLink}
                    />
                    <CTAButton href="#Contact" text="Contact" icon={Mail} />
                  </div>

                  {/* Social Links */}
                  <div
                    className="hidden sm:flex gap-4 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1600"
                  >
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div
                className="w-full py-0 md:py-[10%] sm:py-0 lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-5 sm:mt-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-3xl transition-all duration-700 ease-in-out ${isHovering ? "opacity-60 scale-110" : "opacity-30 scale-100"
                      }`}
                  ></div>

                  {/* Image Container */}
                  <div
                    className={`relative z-10 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[480px] transition-all duration-500 ease-out ${isHovering ? "transform scale-105" : "transform scale-100"
                      }`}
                  >
                    {/* Decorative border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl opacity-75 blur-sm"></div>

                    {/* Image frame */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-1">
                      <div className="relative aspect-square overflow-hidden rounded-xl">
                        {/* Your image */}
                        <img
                          src="JunjunHero.png"
                          alt="Junjun Abdi Nurahman"
                          className={`w-full h-full object-cover transition-all duration-700 ${isHovering ? "scale-110" : "scale-100"
                            }`}
                        />

                        {/* Overlay gradient on hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-[#6366f1]/30 via-transparent to-transparent transition-opacity duration-500 ${isHovering ? "opacity-100" : "opacity-0"
                            }`}
                        ></div>
                      </div>
                    </div>

                    {/* Floating particles effect */}
                    <div className="absolute -inset-4 pointer-events-none">
                      <div
                        className={`absolute top-0 right-0 w-20 h-20 bg-[#6366f1] rounded-full blur-3xl transition-all duration-700 ${isHovering ? "opacity-40 scale-150" : "opacity-20 scale-100"
                          }`}
                      ></div>
                      <div
                        className={`absolute bottom-0 left-0 w-20 h-20 bg-[#a855f7] rounded-full blur-3xl transition-all duration-700 ${isHovering ? "opacity-40 scale-150" : "opacity-20 scale-100"
                          }`}
                      ></div>
                    </div>
                  </div>

                  {/* Animated rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={`absolute w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] border border-[#6366f1]/20 rounded-full transition-all duration-1000 ${isHovering ? "scale-110 opacity-40" : "scale-100 opacity-20"
                        }`}
                    ></div>
                    <div
                      className={`absolute w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] border border-[#a855f7]/20 rounded-full transition-all duration-1000 delay-100 ${isHovering ? "scale-105 opacity-40" : "scale-100 opacity-20"
                        }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);