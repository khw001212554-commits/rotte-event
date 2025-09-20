import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import Join from "./pages/Join";
import Spin from "./pages/Spin";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col">
        {/* 네비게이션 */}
        <header className="p-4 bg-white shadow-lg">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-pink-500">
              🎉 이벤트 페이지
            </h1>
            <nav className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-semibold transition ${
                    isActive ? "text-pink-600 underline" : "text-gray-700 hover:text-pink-500"
                  }`
                }
              >
                홈
              </NavLink>
              <NavLink
                to="/join"
                className={({ isActive }) =>
                  `font-semibold transition ${
                    isActive ? "text-pink-600 underline" : "text-gray-700 hover:text-pink-500"
                  }`
                }
              >
                참가
              </NavLink>
              <NavLink
                to="/spin"
                className={({ isActive }) =>
                  `font-semibold transition ${
                    isActive ? "text-pink-600 underline" : "text-gray-700 hover:text-pink-500"
                  }`
                }
              >
                룰렛
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `font-semibold transition ${
                    isActive ? "text-pink-600 underline" : "text-gray-700 hover:text-pink-500"
                  }`
                }
              >
                관리자
              </NavLink>
            </nav>
          </div>
        </header>

        {/* 컨텐츠 */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Join />} />
              <Route path="/spin" element={<Spin />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </main>

        {/* 푸터 */}
        <footer className="p-4 text-center text-sm text-gray-600 bg-white/80 shadow-inner">
          © 2025 이벤트 페이지 | All rights reserved
        </footer>
      </div>
    </Router>
  );
}

export default App;
