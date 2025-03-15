"use client";
import { motion } from "framer-motion";
import {
  DollarSign,
  Euro,
  PoundSterling,
  Bitcoin,
  IndianRupee,
  SwissFranc,
  TrendingUp,
  TrendingDown,
  BarChart2,
  LineChart
} from "lucide-react";
import { useEffect, useState } from "react";

const forexCryptoIcons = [
  DollarSign,
  Euro,
  PoundSterling,
  Bitcoin,
  IndianRupee,
  SwissFranc,
  TrendingUp,
  TrendingDown,
  BarChart2,
  LineChart
];


// Define the type for our chart data
interface CandleData {
  open: number;
  close: number;
  high: number;
  low: number;
  isBullish: boolean;
  hasTopWick: boolean;
  hasBottomWick: boolean;
  topWickHeight: number;
  bottomWickHeight: number;
}

const AnimatedBackground = () => {
  // Generate realistic candlestick data where each candle opens at the previous candle's close
  const generateRealisticCandleData = (count: number): CandleData[] => {
    const data: CandleData[] = [];
    let previousClose = 100; // Starting value

    for (let i = 0; i < count; i++) {
      const openPrice = previousClose;
      const isVolatileMove = Math.random() < 0.8; // 80% chance of a volatile move
      const volatilityFactor = isVolatileMove ? 2.5 : 1;
      const isBullish = Math.random() > 0.5;
      const priceChange = (Math.random() * 10 + 2) * volatilityFactor;
      const closePrice = isBullish ? openPrice + priceChange : openPrice - priceChange;
      const adjustedClose = Math.max(20, Math.min(80, closePrice));
      previousClose = adjustedClose;

      const hasTopWick = Math.random() > 0.1;
      const hasBottomWick = Math.random() > 0.1;
      const wickExaggerationFactor = isVolatileMove ? 6 : 1.2;
      const topWickHeight = hasTopWick ? (1 + Math.random() * 5) * wickExaggerationFactor : 0;
      const bottomWickHeight = hasBottomWick ? (1 + Math.random() * 5) * wickExaggerationFactor : 0;

      const highPrice = Math.max(openPrice, adjustedClose) + (hasTopWick ? topWickHeight : 0);
      const lowPrice = Math.min(openPrice, adjustedClose) - (hasBottomWick ? bottomWickHeight : 0);

      data.push({
        open: openPrice,
        close: adjustedClose,
        high: highPrice,
        low: lowPrice,
        isBullish: adjustedClose > openPrice,
        hasTopWick,
        hasBottomWick,
        topWickHeight,
        bottomWickHeight
      });
    }
    return data;
  };

  // State for candle count based on screen size.
  const [candleCount, setCandleCount] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 874) {
        setCandleCount(20);
      } else {
        setCandleCount(100);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate candlestick data
  const chartData = generateRealisticCandleData(candleCount);
  // Calculate candle width so they touch edge-to-edge
  const candleWidth = 100 / chartData.length;

  return (
    // The outer container now uses a grid background that spans the entire page.
    <>
      <div
        className={`absolute  overflow-x-hidden -z-20 h-screen bg-gradient-to-b from-background/80 to-transparent  top-0 w-full `}>

      </div >
      {/* Candlesticks container */}
      <div className="absolute -z-50 top-56 left-0 bg-background/20 w-full h-40">
        {chartData.map((candle, i) => {
          const bodyTopOriginal = 100 - Math.max(candle.open, candle.close);
          const bodyBottomOriginal = 100 - Math.min(candle.open, candle.close);
          const originalHeight = Math.max(1, bodyBottomOriginal - bodyTopOriginal);
          const centerY = (bodyTopOriginal + bodyBottomOriginal) / 2;

          const exaggerationFactor = 2;
          const newHeight = originalHeight * exaggerationFactor;
          const newTop = centerY - newHeight / 2;
          const newBottom = newTop + newHeight;

          const wickTopPos = 100 - candle.high;
          const topWickSegmentHeight = newTop - wickTopPos;
          const wickBottomPos = 100 - candle.low;
          const bottomWickSegmentHeight = wickBottomPos - newBottom;

          return (
            <motion.div
              key={`candlestick-${i}`}
              className="absolute h-full"
              style={{
                left: `${i * candleWidth}%`,
                width: `${candleWidth}%`
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1],
                delay: i * 0.15,
              }}
            >
              {/* Candle Body */}
              <div
                className={`-z-30 absolute ${candle.isBullish ? "bg-chart-2/60" : "bg-primary/60"}`}
                style={{
                  width: "70%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: `${newTop}%`,
                  height: `${newHeight}%`,
                  minHeight: "25px"

                }}
              ></div>

              {/* Top Wick */}
              {candle.hasTopWick && topWickSegmentHeight > 0 && (
                <div
                  className="w-px -z-10 bg-foreground/30 absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: `${wickTopPos}%`,
                    height: `${topWickSegmentHeight}%`
                  }}
                ></div>
              )}

              {/* Bottom Wick */}
              {candle.hasBottomWick && bottomWickSegmentHeight > 0 && (
                <div
                  className="w-px -z-20 bg-foreground/30 absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: `${newBottom}%`,
                    height: `${bottomWickSegmentHeight}%`
                  }}
                ></div>
              )}
            </motion.div>
          );
        })}
      </div>

    </>
  );
};

export const BackgroundGrid = () => {
  const floatingVariants = {
    initial: { opacity: 0, y: 10, scale: 0.7 },
    animate: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: [10, -10, 5, 0],
      scale: [0.7, 1, 0.9, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        delay: i * 0.8,
        ease: "easeInOut",
      },
    }),
  };
  return (
    <>
      {
        // Floating animation for icons
        forexCryptoIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-muted-foreground"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            custom={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          >
            <Icon size={14} />
          </motion.div>
        ))
      }
    </>
  )
}
export default AnimatedBackground;
