import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Admin() {
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 검색어 상태

  // 로그인 후 데이터 로딩
  useEffect(() => {
    if (authenticated) {
      const savedParticipants =
        JSON.parse(localStorage.getItem("participants")) || [];
      const savedWinners = JSON.parse(localStorage.getItem("winners")) || [];
      setParticipants(savedParticipants);
      setWinners(savedWinners);
    }
  }, [authenticated]);

  // 전체 데이터 삭제
  const handleClear = () => {
    if (window.confirm("모든 데이터를 삭제하시겠습니까?")) {
      localStorage.removeItem("participants");
      localStorage.removeItem("winners");
      setParticipants([]);
      setWinners([]);
    }
  };

  // 엑셀 다운로드
  const handleDownloadExcel = () => {
    if (participants.length === 0 && winners.length === 0) {
      alert("다운로드할 데이터가 없습니다.");
      return;
    }

    const participantsSheet = XLSX.utils.json_to_sheet(
      participants.map((p, idx) => ({
        번호: idx + 1,
        이름: p.name,
        전화번호: p.phone,
        "참가 시간": p.time,
      }))
    );

    const winnersSheet = XLSX.utils.json_to_sheet(
      winners.map((w, idx) => ({
        번호: idx + 1,
        이름: w.name,
        전화번호: w.phone || "-",
        상품: w.prize,
        "당첨 시간": w.time,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, participantsSheet, "참가자 명단");
    XLSX.utils.book_append_sheet(workbook, winnersSheet, "당첨 내역");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "event-data.xlsx");
  };

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "1235") {
      setAuthenticated(true);
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  // 🔍 검색 필터 적용
  const filteredParticipants = participants.filter(
    (p) =>
      p.name.includes(searchTerm) || (p.phone && p.phone.includes(searchTerm))
  );
  const filteredWinners = winners.filter(
    (w) =>
      w.name.includes(searchTerm) || (w.phone && w.phone.includes(searchTerm))
  );

  // 참가자 수정
  const handleEditParticipant = (index) => {
    const participantToEdit = participants[index];
    const name = prompt("수정할 이름을 입력하세요", participantToEdit.name);
    const phone = prompt("수정할 전화번호를 입력하세요", participantToEdit.phone);
    if (name && phone) {
      const updatedParticipants = participants.map((participant, i) =>
        i === index ? { ...participant, name, phone } : participant
      );
      localStorage.setItem("participants", JSON.stringify(updatedParticipants));
      setParticipants(updatedParticipants);
    }
  };

  // 참가자 삭제
  const handleDeleteParticipant = (index) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      const updatedParticipants = participants.filter((_, i) => i !== index);
      localStorage.setItem("participants", JSON.stringify(updatedParticipants));
      setParticipants(updatedParticipants);
    }
  };

  // 당첨자 수정
  const handleEditWinner = (index) => {
    const winnerToEdit = winners[index];
    const prize = prompt("수정할 상품을 입력하세요", winnerToEdit.prize);
    if (prize) {
      const updatedWinners = winners.map((winner, i) =>
        i === index ? { ...winner, prize } : winner
      );
      localStorage.setItem("winners", JSON.stringify(updatedWinners));
      setWinners(updatedWinners);
    }
  };

  // 당첨자 삭제
  const handleDeleteWinner = (index) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      const updatedWinners = winners.filter((_, i) => i !== index);
      localStorage.setItem("winners", JSON.stringify(updatedWinners));
      setWinners(updatedWinners);
    }
  };

  // 로그인 화면
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg p-8 rounded-xl border w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
            🔒 관리자 로그인
          </h2>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            로그인
          </button>
        </form>
      </div>
    );
  }

  // 관리자 화면
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">📋 관리자 페이지</h2>

      {/* 🔍 검색창 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="이름 또는 전화번호 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 참가자 목록 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">🙋 참가자 명단</h3>
        {filteredParticipants.length === 0 ? (
          <p className="text-gray-600">검색 결과가 없습니다.</p>
        ) : (
          <ul className="bg-white shadow rounded-xl p-6 space-y-2 border border-blue-100">
            {filteredParticipants.map((p, idx) => (
              <li key={idx} className="border-b last:border-none py-2">
                {idx + 1}.{" "}
                <span className="font-bold">{p.name}</span> ({p.phone})
                <span className="text-gray-500 text-sm ml-2">({p.time})</span>
                <button
                  onClick={() => handleEditParticipant(idx)}
                  className="ml-4 text-blue-500 hover:text-blue-700"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteParticipant(idx)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 당첨 내역 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">🎉 당첨 내역</h3>
        {filteredWinners.length === 0 ? (
          <p className="text-gray-600">검색 결과가 없습니다.</p>
        ) : (
          <ul className="bg-white shadow rounded-xl p-6 space-y-2 border border-green-100">
            {filteredWinners.map((w, idx) => (
              <li key={idx} className="border-b last:border-none py-2">
                {idx + 1}.{" "}
                <span className="font-bold">{w.name}</span> ({w.phone || "-"})
                👉 {w.prize}
                <span className="text-gray-500 text-sm ml-2">({w.time})</span>
                <button
                  onClick={() => handleEditWinner(idx)}
                  className="ml-4 text-blue-500 hover:text-blue-700"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteWinner(idx)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          🗑 전체 초기화
        </button>
        <button
          onClick={handleDownloadExcel}
          className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
        >
          📊 엑셀 다운로드
        </button>
      </div>
    </div>
  );
}

export default Admin;
