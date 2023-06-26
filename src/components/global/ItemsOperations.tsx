import React from "react";

type Props = {
  children: React.ReactNode;
};

const ItemsOperations = ({ children }: Props) => {
  return (
    <div
      id="items_operations"
      className="mb-8 flex items-center justify-between rounded-lg 
        bg-white p-5 shadow
        "
    >
      {children}
    </div>
  );
};

export default ItemsOperations;
