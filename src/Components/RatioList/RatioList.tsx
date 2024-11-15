import React from "react";
import { TestDataCompany, testIncomeStatementData } from "../Table/testData";
import { render } from "@testing-library/react";


type Props = {
  data: any;
  config: any;
};


const RatioList = ({data, config}: Props) => {
  const renderedCells = config.map((row: any) => {
    return (
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {row.label}
            </p>
            <p className="tex-sm text-gray-500 trucate">
              {row.subTitle && row.subTitle}
            </p>
          </div>
          <div className="inline-flex items-center font-semibold text-gray-900">
            {row.render(data)}
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full">
      <ul className="divide-y divide-gray-200">{renderedCells}</ul>
    </div>
  );
};
export default RatioList;