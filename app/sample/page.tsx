"use client";

export default function TestButton() {
  const handleClick = async () => {
    const res = await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "チョコ" }),
    });
    const data = await res.json();
    console.log("サーバーから返ってきた:", data);
  };

  return <button onClick={handleClick}>送信</button>;
}
