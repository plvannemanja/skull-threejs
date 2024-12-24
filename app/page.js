import App from '@/components/App';
import React from 'react';

const HomePage = () => {
  return (
    <main>
      <div className="flex flex-col justify-between h-screen w-screen">
      <App />

      {/* Navbar */}
      <div className="flex flex-row items-center justify-between z-0 pointer-events-none w-full px-4 py-4 h-[80px]">
        <div className="flex flex-row items-center">
          <p className="pointer-events-auto ml-8 text-lg font-normal text-white cursor-pointer hover:text-white">
            Home
          </p>
          <a
            className="pointer-events-auto ml-8 text-lg font-normal text-neutral-300 hover:text-white"
            href="https://docs.pvp.trade"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </div>
        <div className="hidden md:block">
          <a href="https://t.me/pvptrade_bot" target="_blank" rel="noopener noreferrer">
            <div className="pointer-events-auto flex items-center rounded-full bg-white px-4 py-3 cursor-pointer">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="text-black"
                height="24"
                width="24"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"></path>
              </svg>
              <p className="text-black text-md ml-2 font-medium">Get Started</p>
            </div>
          </a>
        </div>
      </div>

      {/* Main Section */}
      <div className="z-0 flex flex-col items-start justify-start px-12 py-8 mb-12 pointer-events-none">
        <h1 className="text-[48px] md:text-[90px] text-white font-light mt-4 leading-[88px]">
          PVP.<span className="text-accent-400 font-light">TRADE</span>
        </h1>
        <div className="flex flex-row items-center gap-4 mb-8 -mt-2 leading-3">
          <span className="text-[16px] text-white font-light">Powered by</span>
          <img src="/hl_logo.svg" className="h-4 -ml-2" alt="logo" />
        </div>
        <h2 className="text-[16px] text-white mb-0 font-normal max-w-[780px]">
          Long and short tokens together in your Telegram group. Share alpha, copy,
          and countertrade your friends.
        </h2>
        <h2 className="text-[16px] text-white mb-6 italic max-w-[780px]">
          Don't get liquidated.
        </h2>
        <div>
          <a href="https://t.me/pvptrade_bot" target="_blank" rel="noopener noreferrer">
            <div className="pointer-events-auto flex items-center rounded-full bg-white px-4 py-3 cursor-pointer">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="text-black"
                height="24"
                width="24"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"></path>
              </svg>
              <p className="text-black text-md ml-2 font-medium">Get Started</p>
            </div>
          </a>
        </div>
        <div className="flex flex-row items-center mt-8 gap-4 pointer-events-auto">
          <a
            href="https://twitter.com/pvp_dot_trade"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-2xl text-neutral-400"
              height="1em"
              width="1em"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
            </svg>
          </a>
        </div>
      </div>
      </div>
    </main>
  );
};

export default HomePage;
