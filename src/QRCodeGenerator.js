import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);

  const generateQRCode = () => {
    if (url.trim() !== "") {
      setQrValue(url);
    }
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qrcode.png";
        link.click();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateQRCode}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Generate QR Code
        </button>
        {qrValue && (
          <div className="mt-6 p-4 bg-white rounded-lg" ref={qrRef}>
            <QRCodeCanvas value={qrValue} size={200} className="mx-auto" />
            <button
              onClick={downloadQRCode}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
