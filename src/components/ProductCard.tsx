import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  delay?: number;
}

export default function ProductCard({ image, title, price, delay = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
        <div className="p-6">
          <h3 className="font-display text-2xl mb-2 text-foreground">{title}</h3>
          <p className="text-gradient-gold text-xl font-bold">{price}</p>
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
