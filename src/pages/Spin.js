import React, { useState, useEffect } from "react";

function Spin() {
  const prizes = [
    "🎁 상품1",
    "🍭 상품2",
    "🧸 상품3",
    "🎀 상품4",
    "🍪 상품5",
    "💖 상품6",
  ];
  const colors = ["#FFD6E0", "#FFF3B0", "#D9F8C4", "#B5EAEA", "#C7CEEA", "#FFC8DD"];

  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  useEffect(() => {
    const participants = JSON.parse(localStorage.getItem("participants")) || [];
    const winners = JSON.parse(localStorage.getItem("winners")) || [];

    if (participants.length > 0) {
      const lastUser = participants[participants.length - 1];
      setCurrentUser(lastUser);

      const found = winners.find((w) => w.id === lastUser.id);
      if (found) {
        setAlreadyPlayed(true);
        setResult(found.prize);
      }
    }
  }, []);

  const spinWheel = () => {
    if (!currentUser) {
      alert("먼저 참가 등록을 해주세요!");
      return;
    }
    if (alreadyPlayed) {
      alert(`${currentUser.name}님은 이미 룰렛을 돌리셨습니다!`);
      return;
    }
    if (spinning) return;

    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const degreesPerPrize = 360 / prizes.length;
    const newRotation =
      360 * 5 + (360 - randomIndex * degreesPerPrize - degreesPerPrize / 2);

    setRotation(newRotation);

    setTimeout(() => {
      const randomPrize = prizes[randomIndex];
      setResult(randomPrize);
      setSpinning(false);

      const winner = {
        id: currentUser.id,
        name: currentUser.name,
        phone: currentUser.phone,
        prize: randomPrize,
        time: new Date().toLocaleString(),
      };

      const saved = JSON.parse(localStorage.getItem("winners")) || [];
      saved.push(winner);
      localStorage.setItem("winners", JSON.stringify(saved));

      setAlreadyPlayed(true);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-extrabold text-pink-500 mb-6 animate-bounce">
        ✨ 행운의 룰렛 ✨
      </h2>

      <div className="relative w-[320px] h-[320px]">
        {/* 룰렛 원 */}
        <div
          className="absolute w-full h-full rounded-full border-[6px] border-pink-300 shadow-lg"
          style={{
            transition: "transform 5s cubic-bezier(0.33, 1, 0.68, 1)",
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {prizes.map((prize, i) => {
            const angle = (360 / prizes.length) * i;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 text-sm font-bold text-gray-700"
                style={{
                  width: "80px",
                  textAlign: "center",
                  background: colors[i % colors.length],
                  borderRadius: "12px",
                  padding: "2px 4px",
                  transform: `
                    rotate(${angle}deg)
                    translate(120px)
                    rotate(${-angle}deg)
                    translateX(-50%)
                  `,
                  transformOrigin: "center center",
                }}
              >
                {prize}
              </div>
            );
          })}
        </div>

        {/* 귀여운 점 장식 (전구 느낌) */}
        {[...Array(24)].map((_, i) => {
          const angle = (360 / 24) * i;
          return (
            <div
              key={i}
              className="absolute w-3 h-3 bg-pink-300 rounded-full shadow-sm"
              style={{
                top: "48%",
                left: "48%",
                transform: `rotate(${angle}deg) translate(150px)`,
              }}
            ></div>
          );
        })}

        {/* 화살표 */}
        <div
          className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-0 h-0 
                     border-l-[12px] border-r-[12px] border-b-[20px] 
                     border-l-transparent border-r-transparent border-b-red-500"
        ></div>
      </div>

      {/* 버튼 */}
      <button
        onClick={spinWheel}
        disabled={spinning || alreadyPlayed}
        className={`mt-6 px-10 py-4 rounded-full font-bold text-white shadow-lg relative overflow-hidden transition 
        ${
          spinning || alreadyPlayed
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        <span className="relative z-10">
          🎀 {alreadyPlayed ? "참여 완료" : spinning ? "돌아가는 중..." : "START"} 🎀
        </span>
        {!spinning && !alreadyPlayed && (
          <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 animate-pulse"></span>
        )}
      </button>

      {/* 결과 */}
      {result && (
        <p className="mt-6 text-xl font-bold text-purple-600 animate-bounce bg-yellow-100 px-4 py-2 rounded-full shadow">
          🎉 축하합니다! 👉 {currentUser?.name} 님 🎁 {result} 🎁
        </p>
      )}
    </div>
  );
}

export default Spin;
