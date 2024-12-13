import React from "react";

const StatisticCard = ({ title, children }) => {
  return (
    <div className="flex flex-col items-center bg-[#F3E8EE] border border-[#729B79] rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow max-w-sm dark:bg-[#2e2c2f]">
      <h2 className="text-lg font-bold text-[#475B63] mb-2 text-center dark:text-[#F3E8EE]">
        {title}
      </h2>
      <div className="text-sm text-[#475B63] text-center mb-4 dark:text-[#F3E8EE]">
        {children}
      </div>
    </div>
  );
};

export default StatisticCard;