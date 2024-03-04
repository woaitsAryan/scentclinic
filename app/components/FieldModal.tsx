import React, { useState } from "react";
interface Props {
  labels: string[];
  setLabels: any;
  setAddNewField: React.Dispatch<React.SetStateAction<boolean>>;
}
const FieldModal = ({ labels, setLabels, setAddNewField }: Props) => {
  const [newLabel, setNewLabel] = useState("");
  return (
    <div className="w-[30vw] min-w-fit p-8 rounded-xl h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl  font-poppins flex flex-col gap-4 z-[150]">
      <h1 className="text-2xl font-medium mb-4">Add new field</h1>
      <input
        type="text"
        className="w-full py-2 px-2 border-[1px] border-[#232323] rounded-lg outline-none"
        placeholder="Label name"
        onChange={(e) => setNewLabel(e.target.value)}
      />
      <button
        type="button"
        className="w-fit bg-light text-white px-6 py-2 rounded-lg font-medium text-lg active:scale-95 transition-all duration-200 ease-linear self-end"
        onClick={() => {
          console.log(labels);
          const newLabels = labels;
          newLabels.push(newLabel);
          console.log(newLabels);
          setLabels(newLabels);
          setAddNewField(false);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default FieldModal;
