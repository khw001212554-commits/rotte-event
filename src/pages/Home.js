import React from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-white flex flex-col items-center justify-center p-6">
      {/* 제목 */}
      <h1 className="text-5xl font-extrabold text-pink-500 mb-4 drop-shadow-md animate-bounce">
        🎉 ROTTE이벤트 페이지 🎉
      </h1>

      {/* 설명 */}
      <p className="text-gray-700 text-lg mb-8 text-center max-w-md">
        참여하고 <span className="font-bold text-pink-500">룰렛</span>을 돌려
        <br />
        행운의 상품을 받아가세요! 🍀
      </p>

      {/* QR 코드 박스 */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border-4 border-pink-200 hover:scale-105 transition">
        <QRCodeCanvas
          value="http://localhost:3000/join" // 배포 시 주소 변경
          size={220}
          bgColor="#ffffff"
          fgColor="#ec4899" // Tailwind pink-500
          level="H"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-6">
        <Link
          to="/join"
          className="px-8 py-4 bg-pink-500 text-white font-semibold rounded-xl shadow-lg hover:bg-pink-600 hover:scale-105 transition transform"
        >
          🙋 참가하기
        </Link>
      </div>
    </div>
  );
}

export default Home;
