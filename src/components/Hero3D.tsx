import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

interface DarumaModelProps {
  color: 'red' | 'gold' | 'blue';
}

const colorConfigs = {
  red: {
    main: '#C41E3A',
    dark: '#B71C1C',
    accent: '#FFD700',
  },
  gold: {
    main: '#FFD700',
    dark: '#FFA000',
    accent: '#C41E3A',
  },
  blue: {
    main: '#1E88E5',
    dark: '#0D47A1',
    accent: '#FFD700',
  }
};

function DarumaModel({ color }: DarumaModelProps) {
  const colors = colorConfigs[color];
  
  return (
    <group>
      {/* Main body - sphere */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial 
          color={colors.main} 
          roughness={0.3} 
          metalness={color === 'gold' ? 0.8 : 0.1}
        />
      </mesh>
      
      {/* Bottom - flattened base */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
        <meshStandardMaterial 
          color={colors.dark} 
          roughness={0.4}
          metalness={color === 'gold' ? 0.7 : 0}
        />
      </mesh>
      
      {/* Face area - white circle */}
      <mesh position={[0, 0.3, 1.45]} castShadow>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial 
          color="#FFF8E1" 
          roughness={0.6}
        />
      </mesh>
      
      {/* Left eye */}
      <mesh position={[-0.3, 0.4, 1.46]} castShadow>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Right eye */}
      <mesh position={[0.3, 0.4, 1.46]} castShadow>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Gold accent - top decoration */}
      <mesh position={[0, 0.8, 1]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.3, 6]} />
        <meshStandardMaterial 
          color={colors.accent} 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

interface DarumaInfo {
  name: string;
  meaning: string;
  characteristics: string[];
  power: string;
}

const darumaInfos: Record<'red' | 'gold' | 'blue', DarumaInfo> = {
  red: {
    name: 'Daruma Rouge Traditionnel',
    meaning: '情熱 - Passion',
    characteristics: ['Persévérance', 'Succès', 'Détermination'],
    power: 'Aide à atteindre vos objectifs et surmonter les obstacles'
  },
  gold: {
    name: 'Daruma Doré Fortune',
    meaning: '富 - Fortune',
    characteristics: ['Prospérité', 'Richesse', 'Abondance'],
    power: 'Attire la fortune et les opportunités financières'
  },
  blue: {
    name: 'Daruma Bleu Sagesse',
    meaning: '知恵 - Sagesse',
    characteristics: ['Sérénité', 'Clarté', 'Paix intérieure'],
    power: 'Apporte la sagesse et la tranquillité d\'esprit'
  }
};

interface Hero3DProps {
  selectedColor: 'red' | 'gold' | 'blue';
  onColorChange: (color: 'red' | 'gold' | 'blue') => void;
}

export default function Hero3D({ selectedColor, onColorChange }: Hero3DProps) {
  const info = darumaInfos[selectedColor];
  
  return (
    <div className="space-y-6">
      {/* Color Selector */}
      <div className="flex gap-4 justify-center mb-6">
        {(['red', 'gold', 'blue'] as const).map((color) => (
          <motion.button
            key={color}
            onClick={() => onColorChange(color)}
            className={`w-16 h-16 rounded-full border-4 transition-all ${
              selectedColor === color 
                ? 'border-primary scale-110 shadow-2xl' 
                : 'border-muted hover:scale-105'
            }`}
            style={{ 
              backgroundColor: colorConfigs[color].main,
              boxShadow: selectedColor === color ? `0 0 30px ${colorConfigs[color].main}` : 'none'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* 3D Model */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <Canvas shadows>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} />
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <spotLight 
              position={[-5, 5, 2]} 
              intensity={0.5}
              angle={0.3}
              penumbra={1}
            />
            <DarumaModel color={selectedColor} />
            <OrbitControls 
              enableZoom={false}
              autoRotate
              autoRotateSpeed={2}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 text-accent text-4xl md:text-6xl opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⛩
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-accent text-4xl md:text-6xl opacity-30"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🌸
        </motion.div>
      </div>

      {/* Characteristics Panel */}
      <motion.div
        key={selectedColor}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border"
      >
        <h3 className="font-display text-2xl font-bold mb-2">{info.name}</h3>
        <p className="text-primary text-xl mb-4">{info.meaning}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Caractéristiques</h4>
            <ul className="space-y-1">
              {info.characteristics.map((char, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {char}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Pouvoir</h4>
            <p className="text-sm leading-relaxed">{info.power}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
