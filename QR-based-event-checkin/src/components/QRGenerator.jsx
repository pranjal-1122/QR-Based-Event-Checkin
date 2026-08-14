import { QRCodeSVG } from "qrcode.react";

export default function QRGenerator({ value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg inline-block border-4 border-zinc-800">
      <QRCodeSVG
        value={value}
        size={180}
        bgColor={"#ffffff"}
        fgColor={"#09090b"}
        level={"H"} // High error correction level for reliable camera scanning
        includeMargin={false}
      />
    </div>
  );
}