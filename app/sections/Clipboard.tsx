"use client";
import React, { useState, useRef } from "react";
import copy from "clipboard-copy";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
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
    <div className="w-full aspect-square flex justify-center items-center  border-2 border-dashed border-[#23232340] font-poppins relative">
      {copiedImage && (
        <div
          className="w-6 h-6 bg-red-500 flex items-center justify-center text-white absolute top-0 -left-[15%] rounded-l-lg cursor-pointer"
          onClick={() => setCopiedImage("")}
        >
          <p className="rotate-45">
            <FaPlus />
          </p>
        </div>
      )}
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
        <span
          className="text-sm text-center text-[#23232380] cursor-pointer w-[80%] h-[80%] flex justify-center items-center"
          onClick={handleImagePaste}
        >
          Click here to paste
        </span>
      )}
    </div>
  );
};

export default Clipboard;
