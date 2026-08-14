import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScanSuccess }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Store callback in a ref so useEffect doesn't depend on it
  const onScanSuccessRef = useRef(onScanSuccess);

  useEffect(() => {
    onScanSuccessRef.current = onScanSuccess;
  }, [onScanSuccess]);

  useEffect(() => {
    const elementId = "html5qrcode-container";
    const html5Qrcode = new Html5Qrcode(elementId);

    const config = {
      fps: 10,
      qrbox: { width: 220, height: 220 },
      aspectRatio: 1.0,
    };

    html5Qrcode
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          // Stop camera stream cleanly on scan before firing callback
          html5Qrcode
            .stop()
            .then(() => {
              if (onScanSuccessRef.current) {
                onScanSuccessRef.current(decodedText);
              }
            })
            .catch((err) => console.error("Error stopping scanner:", err));
        },
        () => {
          // Frame-by-frame scan search (ignore)
        }
      )
      .catch((err) => {
        console.error("Unable to start camera:", err);
        setErrorMsg("Camera access denied or unavailable.");
      });

    // Cleanup ONCE when component unmounts
    return () => {
      if (html5Qrcode.isScanning) {
        html5Qrcode.stop().catch((err) => console.error(err));
      }
    };
  }, []); // 👈 Empty dependency array prevents re-render loops & blinking!

  return (
    <div className="w-full max-w-sm mx-auto">
      {errorMsg ? (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center rounded-lg">
          {errorMsg}
        </div>
      ) : (
        <div
          id="html5qrcode-container"
          className="w-full aspect-square bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-inner"
        ></div>
      )}
    </div>
  );
};

export default QRScanner;