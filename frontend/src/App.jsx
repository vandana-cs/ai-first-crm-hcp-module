```jsx
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  // BACKEND URL
  const API = "https://ai-crm-backend-1zaq.onrender.com";

  // LOAD HISTORY
  const loadHistory = async () => {
    try {
      const res = await fetch(
        `${API}/interactions`,
        {
          headers: {
            Authorization: "Bearer test",
          },
        }
      );

      const data = await res.json();

      setHistory(data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message.trim()) {
      return;
    }

    try {

      const res = await fetch(
        `${API}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer test",
          },
          body: JSON.stringify({
            message: message,
            doctor: "Dr Sharma",
            tags: ["diabetes"],
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      setResponse(data.response || data.error);

      setMessage("");

      loadHistory();

    } catch (error) {

      console.log(error);

      setResponse("❌ Backend connection error");
    }
  };

  // DELETE INTERACTION
  const deleteInteraction = async (id) => {

    try {

      await fetch(
        `${API}/interactions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer test",
          },
        }
      );

      loadHistory();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-5">

        <h1 className="text-3xl font-bold mb-10">
          AI CRM SaaS
        </h1>

        <div className="sidebar-link">
          Dashboard
        </div>

        <div className="sidebar-link">
          Interactions
        </div>

        <div className="sidebar-link">
          Analytics
        </div>

        <div className="sidebar-link">
          Doctors
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="crm-title">
          Doctor Interaction Assistant
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          <div className="card">
            <h2 className="text-gray-500">
              Total Interactions
            </h2>

            <p className="text-3xl font-bold mt-2">
              {history.length}
            </p>
          </div>

          <div className="card">
            <h2 className="text-gray-500">
              Doctors
            </h2>

            <p className="text-3xl font-bold mt-2">
              12
            </p>
          </div>

          <div className="card">
            <h2 className="text-gray-500">
              AI Suggestions
            </h2>

            <p className="text-3xl font-bold mt-2">
              34
            </p>
          </div>

        </div>

        {/* CHAT BOX */}
        <div className="card mb-6">

          <textarea
            className="input h-32"
            placeholder="Enter doctor interaction..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="btn-primary"
            onClick={sendMessage}
          >
            Send to AI
          </button>

          {/* AI RESPONSE */}
          <div className="mt-5">

            <h2 className="font-bold text-lg">
              AI Response
            </h2>

            <p className="mt-2 text-gray-700">
              {response}
            </p>

          </div>

        </div>

        {/* HISTORY */}
        <div className="card">

          <h2 className="text-2xl font-bold mb-5">
            Interaction History
          </h2>

          {history.length === 0 ? (

            <p>No interactions yet</p>

          ) : (

            history.map((item) => (

              <div
                key={item.id}
                className="border rounded-lg p-4 mb-3 bg-gray-50"
              >

                <p>
                  <strong>Doctor:</strong> {item.doctor}
                </p>

                <p className="mt-1">
                  <strong>Message:</strong> {item.message}
                </p>

                <p className="mt-1">
                  <strong>AI:</strong> {item.response}
                </p>

                <button
                  onClick={() => deleteInteraction(item.id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
```
