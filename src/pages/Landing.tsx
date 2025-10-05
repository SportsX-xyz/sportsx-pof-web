import { Button } from "@/components/ui/button";
import { ShaderLines } from "@/components/ui/shader-lines";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Trophy, Shield, Users, Zap, Star, Target, HelpCircle, ChevronDown } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Suspense, useState } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import "./Landing.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SafeShaderLines = ({ className }: { className?: string }) => {
  try {
    return <ShaderLines />;
  } catch (error) {
    return <div className={className} style={{ background: "linear-gradient(135deg, hsl(225 59% 49%), hsl(0 100% 50%))" }} />;
  }
};

export default function Landing() {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  const handleJoinWaitlist = () => {
    setShowWaitlistForm(true);
  };


  return (
    <div className="landing-container">
      <Navigation />
      
      {/* Waitlist Form Modal */}
      <WaitlistForm 
        isOpen={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
      />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0 z-50 opacity-60">
          <Suspense fallback={<div className="w-full h-full bg-gradient-hero" />}>
            <SafeShaderLines className="w-full h-full" />
          </Suspense>
        </div>
        
        <div className="hero-content">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title">
              Prove Your Fandom.
              <br />
              Own Your Legacy.
            </h1>
            
            <p className="hero-subtitle">
              The first portable, fan-owned identity layer across global sports. 
              Transform your fandom into verifiable reputation assets with SportsX.
            </p>
            
            <div className="hero-buttons">
              <Button 
                variant="hero"
                size="lg"
                className="text-lg px-8 py-4"
                onClick={handleJoinWaitlist}
              >
                <Trophy className="h-5 w-5 mr-2" />
                Join waitlist
              </Button>
            </div>
            
            <div className="hero-tagline">
              Join the revolution of fan-owned sports identity
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <header className="text-center mb-16">
            <h2 className="features-title">
              Why SportsX Changes Everything
            </h2>
            <p className="features-subtitle">
              Break free from siloed platforms. Own your sports identity across leagues, clubs, and platforms.
            </p>
          </header>
          
          <div className="features-grid">
            <article className="feature-card">
              <Shield className="feature-icon" aria-hidden="true" style={{ color: '#3358C6' }} />
              <h3 className="feature-title">Fan-Owned Identity</h3>
              <p className="feature-description">
                Your data belongs to you, not platforms. Build a verifiable sports identity that travels with you everywhere.
              </p>
            </article>
            
            <article className="feature-card">
              <Users className="feature-icon" aria-hidden="true" style={{ color: 'red' }} />
              <h3 className="feature-title">Cross-Platform Recognition</h3>
              <p className="feature-description">
                Prove your fandom across leagues and clubs. One identity system that works everywhere in sports.
              </p>
            </article>
            
            <article className="feature-card">
              <Zap className="feature-icon" aria-hidden="true" style={{ color: 'hsl(var(--primary-glow))' }} />
              <h3 className="feature-title">Proof of Fandom (PoF)</h3>
              <p className="feature-description">
                Earn verifiable points for your engagement. Transform fandom into composable reputation assets.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Journey to Proof of Fandom
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to build your verifiable sports identity
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up & Connect</h3>
              <p className="text-muted-foreground">
                Create your SportsX account and connect to start earning Proof of Fandom points.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Prove Your Fandom</h3>
              <p className="text-muted-foreground">
                Upload tickets, engage with content, and verify your sports activities across platforms.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-glow rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Build Your Legacy</h3>
              <p className="text-muted-foreground">
                Unlock exclusive access, rewards, and privileges as your Proof of Fandom grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The SportsX Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete decentralized sports infrastructure built for fans, by fans
            </p>
          </div>
          
          <div className="mb-16">
            <InfiniteSlider className="w-full" pauseOnHover duration="30s">
              <div className="flex items-center justify-center w-64 h-32 bg-card rounded-lg border shadow-sm mx-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-3 fade-in-0">
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-primary group-hover:animate-bounce transition-all duration-300" />
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">Prediction Markets</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">AI-powered insights</p>
                </div>
              </div>
              <div className="flex items-center justify-center w-64 h-32 bg-card rounded-lg border shadow-sm mx-4 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-3 fade-in-0 delay-100">
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-secondary group-hover:animate-bounce transition-all duration-300" />
                  <h3 className="font-semibold text-sm group-hover:text-secondary transition-colors duration-300">Fan Tokens</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">Own your fandom</p>
                </div>
              </div>
              <div className="flex items-center justify-center w-64 h-32 bg-card rounded-lg border shadow-sm mx-4 hover:shadow-lg hover:shadow-primary-glow/10 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-3 fade-in-0 delay-200">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary-glow group-hover:animate-bounce transition-all duration-300" />
                  <h3 className="font-semibold text-sm group-hover:text-primary-glow transition-colors duration-300">DAO Governance</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">Community decisions</p>
                </div>
              </div>
              <div className="flex items-center justify-center w-64 h-32 bg-card rounded-lg border shadow-sm mx-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-3 fade-in-0 delay-300">
                <div className="text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-primary group-hover:animate-bounce transition-all duration-300" />
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">NFT Tickets</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">Transparent access</p>
                </div>
              </div>
              <div className="flex items-center justify-center w-64 h-32 bg-card rounded-lg border shadow-sm mx-4 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-3 fade-in-0 delay-400">
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-secondary group-hover:animate-bounce transition-all duration-300" />
                  <h3 className="font-semibold text-sm group-hover:text-secondary transition-colors duration-300">AI Agents</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">Smart strategies</p>
                </div>
              </div>
              <div className="flex items-center justify-center w-64 h-32 bg-card rounded-lg border shadow-sm mx-4 hover:shadow-lg hover:shadow-primary-glow/10 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-3 fade-in-0 delay-500">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-primary-glow group-hover:animate-bounce transition-all duration-300" />
                  <h3 className="font-semibold text-sm group-hover:text-primary-glow transition-colors duration-300">Proof of Fandom</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">Verifiable identity</p>
                </div>
              </div>
            </InfiniteSlider>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background" id="faq">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Proof of Fandom and the SportsX ecosystem
            </p>
          </header>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What is Proof of Fandom?
                </AccordionTrigger>
                <AccordionContent>
                  Proof of Fandom (PoF) is a verifiable identity system that transforms your sports engagement into composable reputation assets. By uploading tickets, engaging with content, and verifying activities, you build a portable sports identity that works across all platforms and leagues.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How do I earn tokens with SportsX?
                </AccordionTrigger>
                <AccordionContent>
                  You earn tokens by proving your fandom through various activities: uploading game tickets, making predictions, participating in governance, engaging with sports content, and building your reputation. These activities generate Proof of Fandom points that translate to token rewards.
                </AccordionContent>
              </AccordionItem>
              
              {/* <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Is SportsX an AI-powered sports betting alternative?
                </AccordionTrigger>
                <AccordionContent>
                  SportsX offers AI-powered prediction markets that are community-driven and transparent, serving as an alternative to traditional sports betting. Our platform focuses on fan engagement and skill-based predictions rather than pure gambling.
                </AccordionContent>
              </AccordionItem> */}
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  How does fan ownership work in sports through SportsX?
                </AccordionTrigger>
                <AccordionContent>
                  SportsX enables fan ownership through decentralized governance, where fans with high Proof of Fandom scores can participate in decisions about teams, leagues, and platform features. Fans can also own tokenized assets and contribute to the sports economy directly.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  What makes SportsX different from other sports platforms?
                </AccordionTrigger>
                <AccordionContent>
                  Unlike siloed platforms, SportsX creates a portable, fan-owned identity layer that works across all sports. Your engagement, reputation, and assets travel with you between leagues, clubs, and platforms, giving you true ownership of your sports identity.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative">
        <div className="absolute inset-0 z-50 opacity-40">
          <Suspense fallback={<div className="w-full h-full bg-gradient-hero" />}>
            <SafeShaderLines className="w-full h-full" />
          </Suspense>
        </div>
        
        <div className="relative container mx-auto px-4 text-center z-50">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Own Your Sports Identity?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Join the first fans building their verifiable sports legacy on SportsX.
          </p>
          
          <Button 
            variant="hero"
            size="lg"
            className="text-lg px-8 py-4"
            onClick={handleJoinWaitlist}
          >
            <Star className="h-5 w-5 mr-2" />
            Join waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div
            aria-label="go home"
            className="mx-auto block size-fit">
            <img 
              src="/images/logo_black.png" 
              alt="SportsX Logo" 
              className="h-8 w-auto mx-auto"
            />
          </div>

          <div className="my-8 flex flex-wrap justify-center gap-6">
            <div className="text-muted-foreground block duration-150">
              <span>Features</span>
            </div>
            <div className="text-muted-foreground block duration-150">
              <span>About</span>
            </div>
            <div className="text-muted-foreground block duration-150">
              <span>Leaderboard</span>
            </div>
            <div className="text-muted-foreground block duration-150">
              <span>Markets</span>
            </div>
            <div className="text-muted-foreground block duration-150">
              <span>Help</span>
            </div>
            <div className="text-muted-foreground block duration-150">
              <span>Contact</span>
            </div>
          </div>
          
          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="https://x.com/sportsXwin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X/Twitter"
              className="text-muted-foreground hover:text-primary block">
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/sportsxwin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block">
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                </svg>
            </a>
            <a
              href="https://discord.gg/Ej7WvKcn4R"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-muted-foreground hover:text-primary block">
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path>
                </svg>
            </a>
            <a
              href="https://t.me/+yoS4kBVIiwc3YmIx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-muted-foreground hover:text-primary block">
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785L21.95 4.902c.252-1.017-.375-1.477-1.285-1.185z"></path>
              </svg>
            </a>
          </div>
          <span className="text-muted-foreground block text-center text-sm">
            © {new Date().getFullYear()} SportsX. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}