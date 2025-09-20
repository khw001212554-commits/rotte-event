import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

function Join() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리디렉션

  const handleSubmit = (e) => {
    e.preventDefault();

    const participants = JSON.parse(localStorage.getItem("participants")) || [];

    // 참가 시간 기록 (YYYY-MM-DD HH:mm 형식)
    const now = new Date();
    const timeString = now.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    // 고유 ID (시간 + 랜덤값 조합)
    const newParticipant = {
      id: Date.now() + "-" + Math.floor(Math.random() * 10000),
      name,
      phone,
      time: timeString,
    };

    const updatedParticipants = [...participants, newParticipant];

    localStorage.setItem("participants", JSON.stringify(updatedParticipants));

    // 현재 사용자 저장 (룰렛에서 사용)
    localStorage.setItem("currentUser", JSON.stringify(newParticipant));

    alert(`${name}님, 참가가 완료되었습니다! 🎉`);

    setName("");
    setPhone("");

    // 룰렛 페이지로 리디렉션
    navigate("/spin"); // 룰렛 페이지로 이동
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-pink-50 p-6">
      <h2 className="text-4xl font-extrabold text-pink-600 mb-6 drop-shadow">
        🙋 참가 페이지
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80 border-2 border-pink-200 hover:shadow-xl transition"
      >
        <input
          type="text"
          placeholder="이름을 입력하세요 ✨"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="tel"
          placeholder="전화번호를 입력하세요 📱"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-pink-500 text-white font-semibold rounded-xl shadow-md hover:bg-pink-600 hover:scale-105 transform transition"
        >
          참가 등록 🎉
        </button>
      </form>

      <p className="mt-6 text-gray-600 text-sm">
        참가 후 <span className="font-bold text-pink-500">룰렛</span>을 돌려보세요! 🍀
      </p>
    </div>
  );
}

export default Join;
