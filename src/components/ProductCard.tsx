import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, Product } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  delay?: number;
}

export default function ProductCard({ id, image, title, price, delay = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product: Product = { id, name: title, price, image };
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
      >
        <div className="aspect-square overflow-hidden bg-muted">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-display text-2xl mb-2 text-foreground">{title}</h3>
            <p className="text-gradient-gold text-xl font-bold">{price}€</p>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-daruma-red to-daruma-red/80 hover:from-daruma-red/90 hover:to-daruma-red/70 text-white font-japanese shadow-md hover:shadow-lg transition-all group"
          >
            <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Ajouter au panier
            <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>
      </motion.div>
      
      {/* 3D shadow effect */}
      <div 
        className="absolute inset-0 bg-primary/10 blur-xl -z-10 transition-opacity"
        style={{ 
          opacity: isHovered ? 0.5 : 0,
          transform: 'translateY(20px)'
        }}
      />
    </motion.div>
  );
}
