import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function DarumaModel() {
  return (
    <group>
      {/* Main body - sphere */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial 
          color="#C41E3A" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Bottom - flattened base */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
        <meshStandardMaterial 
          color="#B71C1C" 
          roughness={0.4}
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
          color="#FFD700" 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
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
          <DarumaModel />
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
      <div className="absolute top-10 left-10 text-accent text-6xl md:text-8xl opacity-20 animate-float">
        ⛩
      </div>
      <div className="absolute bottom-10 right-10 text-accent text-6xl md:text-8xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        🌸
      </div>
    </div>
  );
}
