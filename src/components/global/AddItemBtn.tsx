import { Dispatch, SetStateAction } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  actionFn: () => void;
  btnText: string;
};

const AddItemBtn = ({ actionFn, btnText }: Props) => {
  return (
    <button
      className="text-l flex 
          items-center space-x-2 rounded-lg bg-[#111827] px-4 py-2 text-white
          "
      onClick={actionFn}
    >
      <span>
        <AiOutlinePlus />
      </span>
      <span>{btnText}</span>
    </button>
  );
};

export default AddItemBtn;
