import React, { useEffect } from 'react';
// import './CryptoWidget.css'; // Import the CSS file for styling

const CryptoWidget = () => {
  useEffect(() => {
    const container = document.getElementById('ticker-widget-8');
    if (!container) return;

    // Note: the old script src (embed-widget-tickers.js) loads TradingView's
    // static "Tickers" widget — a fixed row of boxes, it never scrolls.
    // The continuously-looping right-to-left marquee is a different
    // TradingView widget, "Ticker Tape" (embed-widget-ticker-tape.js).
    // Swapping the src (and adding displayMode) is what gets the loop.
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.text = JSON.stringify({
      symbols: [
        {
          description: 'EUR/USD',
          proName: 'FX_IDC:EURUSD',
        },
        {
          description: 'XAU/USD',
          proName: 'FX_IDC:XAUUSD',
        },
        {
          description: 'ETH/USD',
          proName: 'COINBASE:ETHUSD',
        },
        {
          description: 'GBP/USD',
          proName: 'FX_IDC:GBPUSD',
        },
        {
          description: 'USD/INR',
          proName: 'FX_IDC:USDINR',
        },
        {
          description: 'BTC/USD',
          proName: 'COINBASE:BTCUSD',
        },
        {
          description: 'XAU/USD',
          proName: 'FX_IDC:XAUEUR',
        },
        {
          description: 'USD/EUR',
          proName: 'FX_IDC:USDEUR',
        },
        {
          description: 'GBP/USD',
          proName: 'FX_IDC:GBPUSD',
        },
        {
          description: 'USD/INR',
          proName: 'FX_IDC:USDINR',
        },
      ],
      colorTheme: 'light',
      isTransparent: false,
      showSymbolLogo: true,
      displayMode: 'regular',
      locale: 'en',
    });
    container.appendChild(script);

    // Prevents a second, stacked widget from being injected if this
    // component re-mounts (React StrictMode double-invoke, route re-entry).
    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className="crypto-widget-container w-full h-12">
      <div className="tradingview-widget-container z-50 w-full" id="ticker-widget-8">
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com" rel="noopener" target="_blank">
            <span className="blue-text"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CryptoWidget;