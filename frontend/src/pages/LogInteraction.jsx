function LogInteraction() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Log HCP Interaction
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Form Section */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">
            Structured Form
          </h3>

          <input
            type="text"
            placeholder="HCP Name"
            className="w-full border p-2 mb-3 rounded"
          />

          <textarea
            placeholder="Discussion Notes"
            className="w-full border p-2 mb-3 rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Interaction
          </button>
        </div>

        {/* Chat Section */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">
            AI Chat Assistant
          </h3>

          <div className="border h-64 p-3 mb-3 rounded overflow-y-auto">
            <p className="text-gray-500">
              Start conversation with AI...
            </p>
          </div>

          <input
            type="text"
            placeholder="Type interaction details..."
            className="w-full border p-2 rounded"
          />
        </div>

      </div>
    </div>
  )
}

export default LogInteraction