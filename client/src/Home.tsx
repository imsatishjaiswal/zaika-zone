import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Star, ShieldCheck, Search } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchText);
    // Add routing to search results page here later
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[650px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/zaika_zone_hero.png"
            alt="Delicious Food Spread"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white max-w-4xl text-center md:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-medium mb-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Star className="size-4 mr-2 fill-orange-400" />
            Top Rated in Culinary Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Taste the Magic of <span className="text-orange-500 italic">Zaika Zone</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Discover a world of exquisite flavors and artisanal dishes prepared with the finest ingredients. From local favorites to international delicacies, we bring the best to your table.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="relative max-w-2xl mb-10 group animate-in fade-in slide-in-from-bottom-10 duration-1000"
          >
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-orange-500 transition-colors">
                <Search className="size-5" />
              </div>
              <Input
                type="text"
                placeholder="Search restaurant by name, city"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full h-14 pl-12 pr-32 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-none rounded-2xl text-zinc-900 dark:text-white placeholder:text-zinc-500 text-lg shadow-2xl focus:ring-4 focus:ring-orange-500/20 transition-all outline-none"
              />
              <div className="absolute right-2">
                <Button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-10 px-6 rounded-xl transition-all active:scale-95"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 px-8 rounded-xl shadow-lg shadow-orange-500/20">
              Explore Menu
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 h-12 px-8 rounded-xl">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 italic">Experience the Zaika Difference</h2>
            <p className="text-zinc-500 dark:text-zinc-400">We pride ourselves on delivering not just food, but an unforgettable culinary journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Utensils,
                title: "Artisanal Recipes",
                desc: "Every dish is a masterpiece, crafted using traditional techniques and modern flair."
              },
              {
                icon: Star,
                title: "Premium Ingredients",
                desc: "We source only the freshest, high-quality organic ingredients from local producers."
              },
              {
                icon: ShieldCheck,
                title: "Exquisite Quality",
                desc: "Rigorous quality checks ensure every meal exceeds your highest expectations."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:shadow-xl transition-all duration-300 group">
                <div className="size-12 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-orange-500 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-6 animate-in zoom-in duration-500">Ready to taste the excellence?</h2>
        <p className="text-orange-100 mb-10 max-w-xl">Join thousands of food lovers who experience the magic of Zaika Zone every day.</p>
        <Link to="/signup">
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 h-14 px-10 rounded-2xl font-bold text-lg shadow-xl translate-y-0 active:translate-y-px transition-all">
            Join Now - It's Free
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
