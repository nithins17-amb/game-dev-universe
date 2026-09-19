import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronDown, Code2, ExternalLink, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/game-world-hero.jpg";
import yeswinImage from "@/assets/yeswin-krishna.jpg.asset.json";
import harishImage from "@/assets/harish-kumar.jpg.asset.json";
import { event, levels } from "@/data/event";
import { useCountdown } from "@/hooks/useCountdown";
import { useParallax } from "@/hooks/useParallax";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const registerProps = { href: event.registrationUrl, target: "_blank", rel: "noreferrer" };

function PressStart({ onEnter }: { onEnter: () => void }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setValue((current) => Math.min(100, current + 4)), 24);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="intro-screen" role="dialog" aria-label="Start experience">
      <div className="intro-mark"><span>ME</span><span>C</span></div>
      <p className="eyebrow">MEC GAME DEV</p>
      <h1>INITIALIZING<br />GAME WORLD</h1>
      <div className="intro-progress"><span style={{ width: `${value}%` }} /></div>
      <p className="mono-line">LOADING ENVIRONMENT · {value}%</p>
      <Button variant="cinematic" size="cinematic" onClick={onEnter} disabled={value < 100} data-cursor="ENTER">
        <Play /> Start experience
      </Button>
      <button className="scroll-alternative" onClick={onEnter}>Scroll to explore <ArrowDown /></button>
    </div>
  );
}

function Navbar({ active }: { active: number }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const update = () => setSolid(window.scrollY > 48);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const nav = [{ href: "#about", label: "About" }, { href: "#idea", label: "Levels" }, { href: "#experts", label: "Experts" }, { href: "#event", label: "Event" }];
  const activeLevel = levels[active] ?? levels[0];
  return <header className={`site-nav ${solid ? "is-solid" : ""}`}>
    <a className="wordmark" href="#top" aria-label="MEC Game Development home"><b>MEC</b><span>GAME DEV</span></a>
    <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
      {nav.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <a className="mobile-register" {...registerProps}>Register <ArrowRight /></a>
    </nav>
    <div className="nav-status"><span>LEVEL {activeLevel.number} / 06</span><Button asChild variant="cinematic" size="sm"><a {...registerProps}>Register <ArrowRight /></a></Button></div>
    <Button variant="ghost" size="icon" className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button>
  </header>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const parallax = useParallax(ref);
  return <section id="top" ref={ref} className="hero-section">
    <div className="hero-image" style={{ transform: `translate3d(${parallax.x * 5}px, ${parallax.y * 3}px, 0) scale(1.025)` }}>
      <img src={heroImage} width={1920} height={1080} alt="Original fictional explorer overlooking floating ruins in a cinematic game world" />
    </div>
    <div className="hero-vignette" />
    <div className="particles" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 94}%`, top: `${(i * 53) % 88}%`, animationDelay: `${i * -0.7}s` }} />)}</div>
    <div className="hero-content">
      <p className="eyebrow">{event.institution}<br /><span>{event.department}</span></p>
      <h1><span>GAME</span><span className="gradient-type">DEVELOPMENT</span></h1>
      <div className="tagline">{event.tagline.map((word, i) => <span key={word}>{word}{i < 2 && <b>•</b>}</span>)}</div>
      <p className="hero-copy">A one-day hands-on workshop exploring game design, Unity, C# scripting, animation, UI/UX, mobile and web game development, and publishing.</p>
      <div className="hero-actions"><Button asChild variant="cinematic" size="cinematic"><a {...registerProps} data-cursor="ENTER">Register now <ArrowRight /></a></Button><Button asChild variant="cinematicOutline" size="cinematic"><a href="#idea" data-cursor="VIEW">Explore workshop</a></Button></div>
      <div className="hero-facts"><span><b>25</b> SEP 2026</span><span><b>09:00</b> AM</span><span><b>LAB-1</b> FIRST FLOOR</span><span><b>₹300</b> PER PERSON</span></div>
    </div>
    <a className="scroll-cue" href="#about">Scroll to enter <ArrowDown /></a>
  </section>;
}

function SectionHead({ number, overline, line1, line2 }: { number: string; overline: string; line1: string; line2: string }) {
  return <header className="section-head"><div className="level-label"><span>{number}</span><p>Level<br />{overline}</p></div><h2>{line1}<br /><span>{line2}</span></h2></header>;
}

const Pipeline = ({ items, complete }: { items: string[]; complete?: boolean }) => <div className="pipeline">
  {items.map((item, i) => <div className="pipeline-step" key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b>{i < items.length - 1 && <i />}</div>)}
  {complete && <div className="build-complete"><Check /><span>Build complete</span><b>100%</b></div>}
</div>;

function Levels() {
  const [loop, setLoop] = useState("Player");
  const [compile, setCompile] = useState<"idle" | "running" | "done">("idle");
  const run = () => { setCompile("running"); window.setTimeout(() => setCompile("done"), 1250); };
  const loopInfo: Record<string, string> = { Player: "The person at the center of every design decision.", Action: "A clear choice the player can make.", Feedback: "The world responds immediately and meaningfully.", Reward: "Progress that makes the action worthwhile.", Repeat: "A satisfying rhythm players want to revisit." };
  return <>
    <section id="about" className="manifesto"><p className="eyebrow">One day workshop · 25.09.2026</p><h2>YOU ARE NOT JUST<br />ATTENDING A WORKSHOP.<br /><span>YOU ARE ENTERING THE WORLD<br />OF GAME DEVELOPMENT.</span></h2></section>
    <section id="idea" className="level-section"><SectionHead number="01" overline="The Idea" line1="EVERY GAME" line2="STARTS WITH AN IDEA." /><div className="two-column"><div><p className="eyebrow">Introduction to gaming development</p><p className="lead">Understand how games are made and the roles that turn a thought into a playable world.</p></div><Pipeline items={["Idea", "Design", "Build", "Test", "Play"]} /></div></section>
    <section id="design" className="level-section alt"><SectionHead number="02" overline="Game Design" line1="DESIGN" line2="THE EXPERIENCE." /><div className="two-column"><div><p className="lead">Game design principles, the core loop, feedback and player feel.</p><p className="loop-description">{loopInfo[loop]}</p></div><div className="game-loop">{Object.keys(loopInfo).map((item, i) => <button key={item} onMouseEnter={() => setLoop(item)} onFocus={() => setLoop(item)} className={loop === item ? "active" : ""}><span>0{i + 1}</span>{item}</button>)}</div></div></section>
    <section id="unity" className="level-section"><SectionHead number="03" overline="Unity" line1="BUILD" line2="THE WORLD." /><div className="engine"><div className="engine-bar"><span>WORLD_01</span><span>SCENE VIEW</span><span>PLAY MODE</span></div><div className="engine-tree">{["Scene", "Player", "Environment", "Enemy", "Camera", "Light"].map((x) => <span key={x}>{x}</span>)}</div><div className="engine-view"><div className="world-orbit"><i /><i /><i /><span>PLAYER</span></div><p>SCENE / ENVIRONMENT ASSEMBLY</p></div><div className="engine-inspector"><span>TRANSFORM</span><span>MESH</span><span>LIGHTING</span><span>COMPONENTS</span></div></div><p className="topic-line">Unity Hub · GitHub · Project setup · The Editor · Scenes · GameObjects · Components & Prefabs · Package Manager · Free asset libraries · Building projects by assembling</p></section>
    <section id="code" className="level-section code-level"><SectionHead number="04" overline="C#" line1="MAKE IT" line2="MOVE." /><div className="code-window"><div className="code-tabs"><span>PlayerMovement.cs</span><span>{compile === "running" ? "COMPILING..." : compile === "done" ? "BUILD SUCCESSFUL" : "C# FOR UNITY"}</span></div><pre><code><em>using</em> UnityEngine;{"\n\n"}<em>public class</em> PlayerMovement : MonoBehaviour {" {"}{"\n  "}<em>void</em> Update() {" {"}{"\n    "}MovePlayer();{"\n  }\n}"}</code></pre><Button variant="cinematic" size="cinematic" onClick={run} disabled={compile === "running"}>{compile === "done" ? <><Check /> Player ready</> : <><Code2 /> Run script</>}</Button></div><p className="topic-line">C# for Unity · MonoBehaviour lifecycle · Writing your first gameplay script</p></section>
    <section id="animation" className="level-section alt"><SectionHead number="05" overline="Animation" line1="GIVE THE WORLD" line2="LIFE." /><div className="timeline"><div className="silhouette" aria-hidden="true"><span /></div>{["Idle", "Run", "Jump", "Attack"].map((x, i) => <div key={x} className="timeline-row"><span>{x}</span><i style={{ width: `${35 + i * 18}%` }} /><b>{String(i * 24).padStart(3, "0")}</b></div>)}</div><p className="topic-line">Animation fundamentals · Rigs and skeletons · Keyframing environment & props in Unity · Importing rigged 3D characters and animation clips · Animator controllers · State machines</p></section>
    <section id="build" className="level-section"><SectionHead number="06" overline="Hands-on" line1="BUILD" line2="THE GAME." /><div className="two-column build-grid"><div><p className="lead">Build a complete playable 3D game across two sessions.</p><p className="topic-line">Level design · Character control · Enemy behaviour · Navigating AI · Effects · Audio</p><h3>YOUR GAME<br />IS READY.</h3></div><Pipeline complete items={["Design", "Character", "Level", "Enemy", "AI", "Audio", "VFX", "Playable game"]} /></div></section>
  </>;
}

const moreTopics = [
  { title: "UI/UX in Games", items: "Menus · HUD · Game states · Player feedback" },
  { title: "Mobile & Web Game Development", items: "Designing for mobile · Input and performance considerations · Build targets · Publishing games to the browser" },
  { title: "Publishing & Deployment", items: "GitHub · Creating a standalone build" },
];

function Extras() { return <section className="extras"><p className="eyebrow">Beyond the core levels</p>{moreTopics.map((topic, i) => <details key={topic.title} open={i === 0}><summary><span>0{i + 7}</span>{topic.title}<ChevronDown /></summary><p>{topic.items}</p></details>)}</section>; }

function Experts() { const people = [{ name: "Mr. Yeswin Krishna", role: "Unity Developer", image: yeswinImage.url }, { name: "Mr. Harish Kumar V", role: "Lead Game Developer", image: harishImage.url }]; return <section id="experts" className="experts"><div className="experts-title"><p className="eyebrow">Resource persons</p><h2>MEET THE<br /><span>DEVELOPERS.</span></h2></div><div className="expert-list">{people.map((person, i) => <article key={person.name}><div className="portrait"><img loading="lazy" src={person.image} width={640} height={640} alt={`${person.name}, ${person.role}`} /><span>0{i + 1}</span></div><p>{person.role} · Chennai</p><h3>{person.name}</h3><button data-cursor="VIEW">View profile <ArrowRight /></button></article>)}</div></section>; }

function Countdown() { const count = useCountdown(event.startsAt); if (count.live) return <div className="countdown"><h3>WORKSHOP<br />IS LIVE</h3></div>; return <div className="countdown">{(["days", "hours", "minutes", "seconds"] as const).map((unit) => <div key={unit}><strong>{String(count[unit]).padStart(2, "0")}</strong><span>{unit}</span></div>)}</div>; }

function EventDetails() { return <section id="event" className="event-details"><div className="date-lockup"><strong>25</strong><div><span>SEP</span><span>2026</span></div></div><div className="event-grid"><div><span>Day</span><b>Friday</b></div><div><span>Start</span><b>9:00 AM onwards</b></div><div><span>Venue</span><b>First Floor<br />Computer Lab-1</b></div><div><span>Fee</span><b>₹300<br />per participant</b></div></div><div className="location"><p className="eyebrow">Location</p><h2>{event.institution}</h2><p>{event.address}</p><p>{event.department}</p></div><Countdown /></section>; }

function FinalCTA() { return <section id="register" className="final-cta"><p className="eyebrow">The next level is yours</p><h2>READY<br /><span>PLAYER?</span></h2><p className="cta-sub">YOUR JOURNEY STARTS HERE.</p><div className="cta-meta"><span>25 September 2026</span><span>Madras Engineering College</span><span>₹300 / participant</span></div><Button asChild variant="cinematic" size="cinematic"><a {...registerProps} data-cursor="ENTER">Register now <ArrowRight /></a></Button></section>; }

function Cursor() { const [cursor, setCursor] = useState({ x: -100, y: -100, label: "" }); useEffect(() => { const move = (e: PointerEvent) => setCursor({ x: e.clientX, y: e.clientY, label: (e.target as HTMLElement).closest("[data-cursor]")?.getAttribute("data-cursor") ?? "" }); window.addEventListener("pointermove", move); return () => window.removeEventListener("pointermove", move); }, []); return <div className={`custom-cursor ${cursor.label ? "active" : ""}`} style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}>{cursor.label}</div>; }

export function WorkshopExperience() {
  const [intro, setIntro] = useState(false);
  const { active, progress } = useScrollProgress();
  useEffect(() => setIntro(window.localStorage.getItem("mec-game-dev-entered") !== "true"), []);
  const enter = () => { window.localStorage.setItem("mec-game-dev-entered", "true"); setIntro(false); };
  return <main className="experience">{intro && <PressStart onEnter={enter} />}<Cursor /><Navbar active={active} /><aside className="level-rail" aria-label="Workshop level progress"><i><b style={{ height: `${progress * 100}%` }} /></i>{levels.map((level, i) => <a key={level.id} href={`#${level.id}`} className={active === i ? "active" : ""}><span>{level.number}</span>{level.label}</a>)}</aside><Hero /><Levels /><Extras /><Experts /><EventDetails /><FinalCTA /><footer><div><b>MEC</b><span>GAME DEV</span></div><p>{event.institution}<br />{event.address}</p><a href={event.website} target="_blank" rel="noreferrer">madrascollege.ac.in <ExternalLink /></a></footer></main>;
}