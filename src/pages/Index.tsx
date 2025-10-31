import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero3D from '@/components/Hero3D';
import ProductCard from '@/components/ProductCard';
import ScrollProgress from '@/components/ScrollProgress';
import heroImage from '@/assets/hero-daruma.jpg';
import daruma1 from '@/assets/daruma-1.jpg';
import daruma2 from '@/assets/daruma-2.jpg';
import daruma3 from '@/assets/daruma-3.jpg';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedColor, setSelectedColor] = useState<'red' | 'gold' | 'blue'>('red');
  
  const products = [
    { id: 'daruma-red', image: daruma1, title: 'Daruma Rouge Traditionnel', price: 45 },
    { id: 'daruma-gold', image: daruma2, title: 'Daruma Doré Fortune', price: 55 },
    { id: 'daruma-blue', image: daruma3, title: 'Daruma Bleu Sagesse', price: 50 },
  ];

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navigation />
      
      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Daruma du Japon
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              達磨 - Symbole de persévérance
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Chaque pièce est fabriquée à la main dans la plus pure tradition japonaise. 
              Un art ancestral transmis de génération en génération.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir la Collection
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Hero3D selectedColor={selectedColor} onColorChange={setSelectedColor} />
          </motion.div>
        </div>
      </section>

      {/* Tradition Section */}
      <section id="tradition" className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={heroImage} 
                alt="Daruma traditionnel"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                L'Art du Daruma
              </h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Le Daruma est une poupée traditionnelle japonaise qui symbolise la persévérance et la bonne fortune. 
                  Inspiré par Bodhidharma, le fondateur du bouddhisme Zen, chaque Daruma est fabriqué avec soin et dévotion.
                </p>
                <p>
                  Lorsque vous formulez un vœu, vous dessinez un œil. Une fois votre objectif atteint, 
                  vous complétez le second œil en signe de gratitude et d'accomplissement.
                </p>
                <p className="text-primary font-semibold">
                  七転び八起き - Nanakorobi yaoki
                </p>
                <p className="italic">
                  "Tomber sept fois, se relever huit fois"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Notre Collection
            </h2>
            <p className="text-xl text-muted-foreground">
              Fait main avec amour et tradition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Contactez-nous
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Une question sur nos Daruma ? N'hésitez pas à nous écrire.
            </p>
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Votre message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <Button className="w-full py-6 text-lg">
                  Envoyer
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-3xl font-bold mb-4">達磨 DARUMA</h3>
          <p className="text-background/80 mb-6">
            Artisanat japonais traditionnel fait main
          </p>
          <p className="text-background/60 text-sm">
            © 2025 Daruma Japan. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
