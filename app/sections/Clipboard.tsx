"use client";
import React, { useState, useRef } from "react";
import copy from "clipboard-copy";
import Image from "next/image";
const Clipboard = () => {
  const [copiedImage, setCopiedImage] = useState<string | null>(null);
  const handleImagePaste = async () => {
    const clipboard = await navigator.clipboard.read();
    try {
      const image = await clipboard[0].getType("image/png");
      setCopiedImage(URL.createObjectURL(image));
    } catch (error) {
      console.log("Cannot paste text here!");
    }
  };
  return (
    <div
      className="w-full aspect-square flex justify-center items-center  border-2 border-dashed border-[#23232340] font-poppins"
      onClick={handleImagePaste}
    >
      {copiedImage && (
        <Image
          src={copiedImage}
          alt="Pasted"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          width={1000}
          height={1000}
        />
      )}
      {!copiedImage && (
        <span className="text-sm text-center text-[#23232380]">
          Click here to paste
        </span>
      )}
    </div>
  );
};

export default Clipboard;
