import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Users, Zap, Shield, Trophy, Star } from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back to home */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            When Passion Is Powerless — It's Time to Liberate Sports
          </h1>
          <p className="text-lg text-muted-foreground">
            By Temple Dunn, Founder of SportsX
          </p>
        </header>

        <article className="prose prose-lg max-w-none">
          {/* Opening Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Why do we love sports?</h2>
            
            <p className="text-lg leading-relaxed mb-4">
              Not for the trophies, the stats, or the final scores.
            </p>
            
            <p className="text-lg leading-relaxed mb-4">
              But because sports awaken something primal and profound within us — a pursuit of glory, expression, and belonging.
            </p>
            
            <p className="text-lg leading-relaxed mb-8 font-medium">
              Sport is humanity's oldest performance of will.
            </p>
            
            <p className="text-lg leading-relaxed mb-4">
              And yet, in today's world, this raw passion has been captured, monetized, and repackaged into something passive.
            </p>
            
            <p className="text-lg leading-relaxed mb-4">
              Modern sports have become a polished spectacle run by centralized powers:
            </p>
            
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <p className="text-lg leading-relaxed mb-2">
                <strong>Media giants</strong> own the rights. <strong>Platforms</strong> extract the value. <strong>Users</strong> pay, cheer, and leave with nothing.
              </p>
              <p className="text-lg leading-relaxed font-medium text-primary">
                The more we love, the less we own.
              </p>
            </div>
            
            <p className="text-lg leading-relaxed font-semibold">
              We refuse to accept that this is the final form of sports.
            </p>
          </section>

          {/* SportsX Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Introducing SportsX: A Redistribution Movement for the Sports World
            </h2>
            
            <p className="text-lg leading-relaxed mb-4">
              SportsX is not a product. It is a paradigm shift — a movement to restructure the architecture of sports participation.
            </p>
            
            <p className="text-lg leading-relaxed mb-4">
              We are not here to "optimize" the existing model.
            </p>
            
            <p className="text-lg leading-relaxed mb-8">
              We are here to <strong>dismantle</strong> it, and reimagine sports through the lens of Web3 and AI — where every fan, player, and contributor has agency, rights, and reward.
            </p>
          </section>

          {/* Core Beliefs */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-8">We believe three things:</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  1. Passion is productivity.
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                  Everyone who analyzes matches, follows athletes, shares highlights, or contributes to community governance is building the sports world.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Their actions, data, and insights should not be siphoned for free.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  They must be verified on-chain, measured, and rewarded.
                </p>
                <p className="text-lg leading-relaxed font-medium">
                  They are not spectators. They are co-creators of value.
                </p>
              </div>

              <div className="border-l-4 border-secondary pl-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-secondary" />
                  2. Intelligence Should Not Be Monopolized.
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                  AI will break the gatekeeping.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  SportsX is building an open protocol where anyone can develop, train, and follow AI prediction models—
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  to let strategy, not luck, decide outcomes.
                </p>
                <p className="text-lg leading-relaxed font-medium">
                  Every fan can now own their algorithmic team.
                </p>
              </div>

              <div className="border-l-4 border-primary-glow pl-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-glow" />
                  3. Consensus is stronger than permission.
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                  We do not believe centralized votes speak for fans.
                </p>
                <p className="text-lg leading-relaxed">
                  We are building a self-governed sports community driven by tokens, governed by DAOs, shaped by collective will.
                </p>
              </div>
            </div>
          </section>

          {/* How We Redefine */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary">How We Redefine the Game</h2>
            
            <div className="grid gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  <strong>A decentralized prediction market</strong> that replace bookmakers with battles of insight and knowledge;
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  <strong>AI agents</strong> that help users to play like pros, copy expert strategies, or build their own;
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  <strong>Blockchain-based recognition</strong> of user behavior, enthusiasm, identity, and reputation—creating a true fan balance sheet;
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  <strong>Performance tokens</strong> link fans directly to players' real-world success, enabling a new fan–athlete economic relationship;
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  <strong>On-chain governance</strong> that reallocates visibility and funding to grassroots sports, niche events, and overlooked talent;
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  <strong>A decentralized ticketing protocol</strong> that ends platform monopoly over access: every ticket becomes a transparent, fair, composable fan token-from match entry to IRL meetups, from memberships to collectible NFTs—all minted, verified, and owned on-chain.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-hero rounded-lg p-8 text-center mb-8">
              <p className="text-xl leading-relaxed text-white mb-4 font-medium">
                This is not just a technical evolution. It is a civilizational correction.
              </p>
              <p className="text-lg leading-relaxed text-white/90 mb-4">
                This is a movement to return sports to its human roots.
              </p>
              <p className="text-lg leading-relaxed text-white/90 mb-4">
                To redefine participation from passive watching to sovereign ownership.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                To transform emotion into economic empowerment.
              </p>
            </div>
            
            <p className="text-xl leading-relaxed font-semibold mb-8 text-center">
              Decentralized sports (DeSports) is not an industry. It is an era-defining belief.
            </p>
          </section>

          {/* Final Questions */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">And so we ask:</h2>
            
            <div className="space-y-6 text-center">
              <p className="text-lg leading-relaxed">
                When platforms profit from your passion—shouldn't you share the upside?
              </p>
              
              <p className="text-lg leading-relaxed">
                When AI only serves the elite—can we build it to serve everyone?
              </p>
              
              <p className="text-lg leading-relaxed">
                When tickets are restricted, emotions are commodified, and decisions are centralized—can we still call it "the people's game"?
              </p>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                SportsX is our answer.
              </p>
              <p className="text-xl leading-relaxed font-medium">
                Let passion speak. Let fandom become sovereignty.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link to="/auth?tab=signup">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Trophy className="h-5 w-5 mr-2" />
                Join the Movement
              </Button>
            </Link>
          </section>
        </article>
      </div>
    </div>
  );
}