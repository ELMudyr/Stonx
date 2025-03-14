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

// Floating animation for icons
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

// Background gradient and animated lines (existing tailwind classes)
const backgroundStyles = `
  before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r 
  before:from-bg-accent before:via-bg-background before:to-bg-accent 
  before:opacity-70
  after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.07),_transparent)]
`;

// Grid background style using CSS repeating linear gradients
// const gridBackgroundStyle = {
//   backgroundImage: `
//     repeating-linear-gradient(
//       to bottom,
//       transparent,
//       transparent 39px,
//       rgba(255,255,255,0.3) 40px
//     ),
//     repeating-linear-gradient(
//       to right,
//       transparent,
//       transparent 39px,
//       rgba(255,255,255,0.2) 40px
//     )
//   `,
// };

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
    <div
      className={`absolute inset-0 overflow-x-hidden -z-20 h-full w-full `}

    >
      <div className="relative h-full w-full  bg-background/70">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_64px]"></div>
      </div>

      {/* Chart line connecting closes */}
      {/* <svg className="absolute inset-0 w-full h-full"> */}
      {/*   {chartData.length > 0 && ( */}
      {/*     <motion.path */}
      {/*       d={`M0,${100 - (chartData[0]?.close ?? 0)} ${chartData */}
      {/*         .map( */}
      {/*           (point: CandleData, i: number): string => */}
      {/*             `L${i * candleWidth + candleWidth}%,${100 - (point.close ?? 0)}` */}
      {/*         ) */}
      {/*         .join(" ")}`} */}
      {/*       fill="none" */}
      {/*       stroke="text-muted-foreground" */}
      {/*       strokeWidth="9" */}
      {/*       initial={{ pathLength: 0 }} */}
      {/*       animate={{ pathLength: 1 }} */}
      {/*       transition={{ duration: 10, repeat: Infinity, ease: "linear" }} */}
      {/*     /> */}
      {/*   )} */}
      {/* </svg> */}

      {/* Candlesticks container */}
      <div className="absolute -z-50 top-56 left-0 w-full h-40">
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
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.23
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

      {/* Floating forex & crypto icons */}
      {
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
    </div >
  );
};

export default AnimatedBackground;
