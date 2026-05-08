import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { Droplets, RefreshCw } from "lucide-react";

const WaterFooter = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. Setup Matter.js Engine & Render
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite;

    const engine = Engine.create();
    engineRef.current = engine;
    
    // Make gravity feel a bit more like fluid
    engine.world.gravity.y = 1.2;

    const width = sceneRef.current.clientWidth;
    const height = 400; // Footer height

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio, // High-DPI support
      },
    });

    // 2. Create Boundaries (Floor and Walls)
    const wallOptions = { 
      isStatic: true, 
      render: { fillStyle: "transparent" } 
    };
    const ground = Bodies.rectangle(width / 2, height + 25, width + 100, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);

    // 3. Create Invisible Obstacles for the "COOKIEAI" text
    // We create a series of blocks in the center to act as physical text barriers
    const letterWidth = width > 768 ? 60 : 30;
    const spacing = width > 768 ? 20 : 10;
    const totalLetters = 8; // C-O-O-K-I-E-A-I
    const totalWidth = (letterWidth * totalLetters) + (spacing * (totalLetters - 1));
    const startX = (width - totalWidth) / 2 + (letterWidth / 2);
    
    const letterBodies = [];
    for (let i = 0; i < totalLetters; i++) {
      letterBodies.push(
        Bodies.rectangle(
          startX + i * (letterWidth + spacing),
          height / 2 + 20, // Vertical center roughly matching the text
          letterWidth,
          width > 768 ? 80 : 40,
          { 
            isStatic: true, 
            angle: (Math.random() - 0.5) * 0.1, // Slight organic tilt
            render: { fillStyle: "transparent" } // Keep them invisible
          }
        )
      );
    }

    World.add(engine.world, [ground, leftWall, rightWall, ...letterBodies]);

    // 4. Function to create "Water" particles
    const createWater = (dropCount = 150) => {
      const particles = [];
      for (let i = 0; i < dropCount; i++) {
        const radius = Math.random() * 4 + 3; // Random size drops
        particles.push(
          Bodies.circle(
            Math.random() * width, 
            -Math.random() * 500 - 50, // Drop from above screen
            radius,
            {
              restitution: 0.6, // Bounciness
              friction: 0.001,  // Low friction so they slide like water
              density: 0.04,
              render: {
                fillStyle: ["#00D4FF", "#3B82F6", "#8B5CF6"][Math.floor(Math.random() * 3)], // Blues and violets
              },
            }
          )
        );
      }
      World.add(engine.world, particles);
    };

    // Initial water drop
    createWater(300);

    // Attach to global window object so buttons can trigger it
    window.addMoreWater = () => createWater(100);
    window.clearWater = () => {
      const allBodies = Composite.allBodies(engine.world);
      const particles = allBodies.filter(b => !b.isStatic);
      World.remove(engine.world, particles);
    };

    // 5. Add Mouse Interaction (Let user splash the water)
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);
    
    // Keep the mouse in sync with scrolling
    render.mouse = mouse;

    // 6. Run the Engine
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Cleanup on unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <footer className="relative h-[400px] w-full bg-[#050505] overflow-hidden flex flex-col justify-end border-t border-white/10">
      
      {/* 1. Ambient Glow Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 2. Matter.js Physics Canvas Container */}
      <div 
        ref={sceneRef} 
        className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* 3. HTML Text Overlay (Matches the invisible physics blocks) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white/90 uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          COOKIE<span className="text-blue-500">AI</span>
        </h2>
      </div>

      {/* 4. Controls & Footer Info */}
      <div className="relative z-30 w-full px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent">
        
        {/* Interactive Physics Controls */}
        <div className="flex gap-3">
          <button 
            onClick={() => window.addMoreWater()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider hover:bg-blue-500/30 transition-colors border border-blue-500/30 backdrop-blur-md active:scale-95"
          >
            <Droplets size={14} /> Add Fluid
          </button>
          <button 
            onClick={() => window.clearWater()}
            className="flex items-center gap-2 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-md active:scale-95"
            aria-label="Reset Fluid"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex items-center gap-8 text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
          <span>©{new Date().getFullYear()} CookieAI</span>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">Twitter</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">GitHub</a>
        </div>
      </div>

    </footer>
  );
};

export default WaterFooter;