import { useState } from "react";

export default function RitronAI() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("default");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const apiKey = "AIzaSyD4i1PQh76B_03jYAqE9F3kkX77pBZzQxM"; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setOutput("");

    const fullPrompt =
      tone === "default" ? prompt : `Generate text in a ${tone} tone: ${prompt}`;

    try {
      const payload = {
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (
        result.candidates &&
        result.candidates[0].content.parts.length > 0
      ) {
        setOutput(result.candidates[0].content.parts[0].text);
      } else {
        setOutput("No response received.");
      }
    } catch (err) {
      console.error(err);
      setOutput("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">RITRON AI</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Hi, I’m Ritron. Let’s solve, explore & learn together."
          className="w-full p-3 border rounded-lg"
          rows="5"
        ></textarea>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="default">Default</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="witty">Witty</option>
          <option value="friendly">Friendly</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg"
        >
          Generate Text
        </button>
      </form>

      {loading && (
        <p className="mt-4 text-center text-gray-600">Generating content...</p>
      )}

      {output && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Generated Text</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
