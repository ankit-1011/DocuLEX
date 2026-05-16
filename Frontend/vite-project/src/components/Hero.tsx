import '../index.css'
import { motion } from 'framer-motion';
import { useState } from 'react';

const Hero = () => {

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    return (
        <div
            className="relative overflow-hidden flex justify-center items-center flex-col gap-8 m-8 min-h-[60vh] bg-black"
            onMouseMove={(e) => {
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                });
            }}
        >

            {/* Grid Background */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Cursor Glow Effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(
                            250px at ${position.x}px ${position.y}px,
                            rgba(251,191,36,0.18),
                            transparent
                        )
                    `
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 text-8xl font-[550] text-center"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                Embed the<br />

                <span className="relative inline-block">
                    <span className="text-white">
                        Blockchain, Anywhere
                    </span>

                    <span
                        className="absolute inset-0 text-gray-400 overflow-hidden"
                        style={{
                            clipPath: 'inset(50% 0 0 0)'
                        }}
                    >
                        Blockchain, Anywhere
                    </span>
                </span>
            </motion.div>

            <motion.div
                className="relative z-10 text-3xl text-gray-300 text-center max-w-3xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                Transparent disputes, immutable records,
                and trustless enforcement — bringing justice onchain.
            </motion.div>

            <div className="relative z-10 flex gap-3 mt-4 marquee flex-wrap justify-center">

                <button className="text-[#35e64d] border border-green-500 text-3xl p-2 rounded-xl hover:scale-105 transition-all">
                    Success ✓
                </button>

                <button className="border border-white text-white text-3xl rounded-xl p-2 hover:border-amber-300 transition-all">
                    Onchain
                </button>

                <button className="border border-white text-white text-3xl rounded-xl p-2 hover:border-amber-300 transition-all">
                    ZK Proof
                </button>

                <button className="border border-white text-white text-3xl rounded-xl p-2 hover:border-amber-300 transition-all">
                    DAOs
                </button>

                <button className="text-[#35e64d] border border-green-500 text-3xl rounded-xl p-2 hover:scale-105 transition-all">
                    Success ✓
                </button>

                <button className="border border-white text-white text-3xl rounded-xl p-2 hover:border-amber-300 transition-all">
                    NFTs
                </button>

                <button className="border border-white text-white text-3xl rounded-xl p-2 hover:border-amber-300 transition-all">
                    Tamper Proofs
                </button>

            </div>
        </div>
    )
}

export default Hero