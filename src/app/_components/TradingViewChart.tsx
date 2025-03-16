"use client"

import { useEffect, useRef } from "react";

const TradingViewChart = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: containerRef.current?.id,
        width: "100%",
        height: 500,
        symbol: "NASDAQ:AAPL", // Change this to your preferred stock
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: false,
      });
    };

    document.body.appendChild(script);
  }, []);

  return <div id="tradingview-widget" ref={containerRef} />;
};

export default TradingViewChart;
