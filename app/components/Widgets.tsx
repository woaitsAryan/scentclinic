import React, { useState } from "react";
import { BsZoomIn } from "react-icons/bs";
import { BsZoomOut } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
interface Props {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setSavePdf: React.Dispatch<React.SetStateAction<boolean>>;
  setAddNewField: React.Dispatch<React.SetStateAction<boolean>>;
}
const Widgets = ({ zoom, setZoom, setSavePdf, setAddNewField }: Props) => {
  const [tooltip, setTooltip] = useState(-1);
  return (
    <div className="w-12 bg-white rounded-lg fixed top-24 -translate-x-[110%] p-2 flex flex-col gap-2 cursor-pointer shadow-lg">
      <div
        className="p-2 hover:bg-base rounded-lg flex justify-center relative"
        onMouseOver={() => setTooltip(0)}
        onMouseOut={() => setTooltip(-1)}
        onClick={() => {
          if (zoom < 4) {
            setZoom(zoom + 1);
          }
        }}
      >
        <BsZoomIn size={20} />
        {tooltip === 0 && (
          <div className="tooltip bg-[#232323] text-sm text-white rounded-md px-3 py-1 absolute -translate-x-[90%] top-1/2 -translate-y-1/2 text-nowrap ">
            <p>Zoom In</p>
            <div className="tip bg-[#232323] w-2 h-2 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>
      <div
        className="p-2 hover:bg-base rounded-lg flex justify-center relative cursor-pointer"
        onClick={() => {
          if (zoom > 0) {
            setZoom(zoom - 1);
          }
        }}
        onMouseOver={() => setTooltip(1)}
        onMouseOut={() => setTooltip(-1)}
      >
        <BsZoomOut size={20} />
        {tooltip === 1 && (
          <div className="tooltip bg-[#232323] text-sm text-white rounded-md px-3 py-1 absolute -translate-x-[90%] top-1/2 -translate-y-1/2 text-nowrap ">
            <p>Zoom Out</p>
            <div className="tip bg-[#232323] w-2 h-2 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>
      <div
        className="p-2 hover:bg-base rounded-lg flex justify-center relative"
        onClick={() => {
          setZoom(5);
          setSavePdf(true);
        }}
        onMouseOver={() => setTooltip(2)}
        onMouseOut={() => setTooltip(-1)}
      >
        <BsSave size={20} />
        {tooltip === 2 && (
          <div className="tooltip bg-[#232323] text-sm text-white rounded-md px-3 py-1 absolute -translate-x-[90%] top-1/2 -translate-y-1/2 text-nowrap  cursor-pointer">
            <p>Download</p>
            <div className="tip bg-[#232323] w-2 h-2 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>
      {/* <div
        className="p-2 hover:bg-base rounded-lg flex justify-center relative cursor-pointer"
        onClick={() => setAddNewField(true)}
        onMouseOver={() => setTooltip(3)}
        onMouseOut={() => setTooltip(-1)}
      >
        <GoPlus size={20} />
        {tooltip === 3 && (
          <div className="tooltip bg-[#232323] text-sm text-white rounded-md px-3 py-1 absolute -translate-x-[90%] top-1/2 -translate-y-1/2 text-nowrap ">
            <p>Add new field</p>
            <div className="tip bg-[#232323] w-2 h-2 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Widgets;
