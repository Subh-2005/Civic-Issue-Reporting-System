import React, { useState } from "react";

const OcrReader: React.FC = () => {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "AIzaSyDcNoYhpNi1jR5YUIetR2bWVwNnAKUChZk"; // 🔑 Replace with your actual key
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = (reader.result as string).split(",")[1];

      const body = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "TEXT_DETECTION" }],
          },
        ],
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        const detectedText =
          data.responses?.[0]?.textAnnotations?.[0]?.description || "";

        if (!detectedText || detectedText.trim().length < 10) {
          setError(
            "Photo is not valid for submission. Please upload a clear document with readable text."
          );
        }

        setText(detectedText || "No text found");
      } catch (err) {
        console.error("OCR Error:", err);
        setError("Error detecting text.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">OCR Reader</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>⏳ Processing...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {text && !error && (
        <div className="mt-4">
          <h3 className="font-semibold">Detected Text:</h3>
          <pre className="bg-gray-100 p-2 rounded">{text}</pre>
        </div>
      )}
    </div>
  );
};

export default OcrReader;
