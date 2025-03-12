"use client"
import { motion } from "framer-motion";
import {
  DollarSign, Euro, PoundSterling, Bitcoin, IndianRupee, SwissFranc,
  TrendingUp, TrendingDown, BarChart2, LineChart
} from "lucide-react";

const forexCryptoIcons = [
  DollarSign, Euro, PoundSterling, Bitcoin, IndianRupee, SwissFranc,
  TrendingUp, TrendingDown, BarChart2, LineChart
];

// Floating animation
const floatingVariants = {
  initial: { opacity: 0, y: 10, scale: 0.7 },
  animate: (i: number) => ({
    opacity: [0, 1, 1, 0],
    y: [10, -10, 5, 0],
    scale: [0.7, 1, 0.9, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      delay: i * 0.8, // Staggered effect
      ease: "easeInOut",
    },
  }),
};

// Background gradient and animated lines
const backgroundStyles = `
  before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r 
  before:from-bg-accent before:via-bg-background before:to-bg-accent 
  before:opacity-70
  after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.07),_transparent)]
`;

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

    // Start with an initial value
    let previousClose = 50; // Starting value

    for (let i = 0; i < count; i++) {
      // Each candle opens at the previous candle's close
      const openPrice = previousClose;

      // Create movement from the open price
      const isVolatileMove = Math.random() < 0.2; // 20% chance of a volatile move
      const volatilityFactor = isVolatileMove ? 2.5 : 1;

      // Determine if the candle will be bullish or bearish
      const isBullish = Math.random() > 0.5;

      // Calculate the close price based on volatility and direction
      const priceChange = (Math.random() * 8 + 2) * volatilityFactor;
      const closePrice = isBullish
        ? openPrice + priceChange
        : openPrice - priceChange;

      // Keep values in a reasonable range (focus on top portion)
      const adjustedClose = Math.max(20, Math.min(80, closePrice));

      // Store the adjusted close for the next candle
      previousClose = adjustedClose;

      // Randomize wick features
      const hasTopWick = Math.random() > 0.1; // 90% chance to have top wick
      const hasBottomWick = Math.random() > 0.1; // 90% chance to have bottom wick

      // Calculate wick heights
      const wickExaggerationFactor = isVolatileMove ? 2 : 1.2;
      const topWickHeight = hasTopWick
        ? (1 + Math.random() * 5) * wickExaggerationFactor
        : 0;
      const bottomWickHeight = hasBottomWick
        ? (1 + Math.random() * 5) * wickExaggerationFactor
        : 0;

      // Calculate high/low based on open/close and wicks
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

  // Generate candlestick data
  const chartData = generateRealisticCandleData(40);

  // Calculate candle width to make them touch
  const candleWidth = 100 / chartData.length;

  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 opacity-20 min-h-full ${backgroundStyles}`}>
      {/* Background chart grid - spanning the entire page */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`grid-line-${i}`}
          className="absolute w-full h-px bg-muted-foreground/40"
          style={{ top: `${i * 8.33}%` }}
        />
      ))}

      {/* Y-axis labels */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`y-axis-${i}`}
          className="absolute left-2 text-xs text-muted-foreground/60"
          style={{ top: `${i * 20}%`, transform: 'translateY(-50%)' }}
        >
          {100 - i * 20}
        </div>
      ))}

      {/* X-axis (time) grid lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`x-grid-${i}`}
          className="absolute h-full w-px bg-muted-foreground/20"
          style={{ left: `${i * 8.33 + 0.6}%` }}
        />
      ))}

      {/* Chart line connecting closes - with proper type safety */}
      <svg className="absolute inset-0 w-full h-full">
        {chartData.length > 0 && (
          <motion.path
            d={`M0,${100 - (chartData[0]?.close ?? 0)} ${chartData.map((point: CandleData, i: number): string =>
              `L${i * candleWidth + candleWidth}%,${100 - (point.close ?? 0)}`
            ).join(' ')}`}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>

      {/* Candlesticks positioned at the top of the page with touching edges */}
      <div className="absolute top-56 left-0 w-full h-40">
        {chartData.map((candle, i) => {
          // Calculate body dimensions
          const candleHeight = Math.abs(candle.close - candle.open);
          // The body starts at the min of open/close
          const bodyTop = 100 - Math.max(candle.open, candle.close);
          const bodyBottom = 100 - Math.min(candle.open, candle.close);

          return (
            <motion.div
              key={`candlestick-${i}`}
              className="absolute h-full"
              style={{
                left: `${i * candleWidth}%`,
                width: `${candleWidth}%`
              }}
              animate={{
                y: [0, -3, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.03
              }}
            >
              {/* Candlestick Body (wider body) */}
              <div
                className={`absolute ${candle.isBullish ? "bg-chart-2/60" : "bg-primary/60"}`}
                style={{
                  width: `${candleWidth * 35}%`, // Increased width
                  left: `${candleWidth * 0.05}%`, // Adjusted to keep the centering
                  top: `${bodyTop}%`,
                  height: `${Math.max(1, bodyBottom - bodyTop)}%`,
                  minHeight: "25px" // Ensure visibility for small candles
                }}
              ></div>

              {/* Entire candle range line (including wicks), now positioned on top */}
              <div
                className="w-px bg-foreground/30 absolute left-1/2 transform -translate-x-1/2"
                style={{
                  top: `${100 - candle.high}%`,
                  height: `${candle.high - candle.low}%`
                }}
              ></div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating forex & crypto icons - distributed throughout the page */}
      {forexCryptoIcons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-muted-foreground"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          custom={i}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <Icon size={14} />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
