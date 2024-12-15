import React from "react";



const StatisticCard = ({ title, children, className }) => {
    return (
        <div className={`border border-[#729B79] rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow w-full mb-4 ${className} m-4`}>
            <h2 className="text-lg font-bold text-[#475B63] mr-2 text-center dark:text-[#F3E8EE] mb-4">
              {title}
            </h2>
            <div className="text-sm text-[#475B63] text-center mb-4 dark:text-[#F3E8EE]">
              {children}
            </div>
        </div>
    );
};

export default StatisticCard;