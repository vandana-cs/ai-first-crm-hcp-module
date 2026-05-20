import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD HISTORY
  // =========================
  const loadHistory = async () => {
    try {
      const res = await fetch(`${API}/interactions`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("History load error:", err);
      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // =========================
  // SEND MESSAGE TO BACKEND
  // =========================
  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          doctor: "Dr Sharma",
          tags: ["diabetes"],
        }),
      });

      const data = await res.json();

      if (data.response) {
        setResponse(data.response);
      } else if (data.error) {
        setResponse(data.error);
      } else {
        setResponse("No response from server");
      }

      setMessage("");
      loadHistory();
    } catch (error) {
      console.error(error);
      setResponse("❌ Backend connection error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE INTERACTION
  // =========================
  const deleteInteraction = async (id) => {
    try {
      await fetch(`${API}/interactions/${id}`, {
        method: "DELETE",
      });

      loadHistory();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-10">
          AI CRM SaaS
        </h1>

        <div className="mb-3 cursor-pointer">Dashboard</div>
        <div className="mb-3 cursor-pointer">Interactions</div>
        <div className="mb-3 cursor-pointer">Analytics</div>
        <div className="mb-3 cursor-pointer">Doctors</div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Doctor Interaction Assistant
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-5 mb-6">

          <div className="bg-white p-5 rounded shadow">
            <h2>Total Interactions</h2>
            <p className="text-2xl font-bold">{history.length}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>Doctors</h2>
            <p className="text-2xl font-bold">12</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>AI Suggestions</h2>
            <p className="text-2xl font-bold">34</p>
          </div>

        </div>

        {/* CHAT */}
        <div className="bg-white p-5 rounded shadow mb-6">

          <textarea
            className="w-full border p-3 rounded"
            rows="4"
            placeholder="Enter doctor interaction..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send to AI"}
          </button>

          {/* RESPONSE */}
          <div className="mt-4">
            <h2 className="font-bold">AI Response</h2>
            <p className="text-gray-700 mt-2">{response}</p>
          </div>

        </div>

        {/* HISTORY */}
        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-xl font-bold mb-4">
            Interaction History
          </h2>

          {history.length === 0 ? (
            <p>No interactions yet</p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="border p-3 rounded mb-3 bg-gray-50"
              >
                <p><b>Doctor:</b> {item.doctor}</p>
                <p><b>Message:</b> {item.message}</p>
                <p><b>AI:</b> {item.response}</p>

                <button
                  onClick={() => deleteInteraction(item.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default App;