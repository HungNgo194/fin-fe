import React from "react";
import Table from "../../Components/Table/Table";
import RatioList from "../../Components/RatioList/RatioList";
import { testIncomeStatementData } from "../../Components/Table/testData";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
];

const DesignPage = (props: Props) => {
  return (
    <>
      <RatioList data={testIncomeStatementData} config={tableConfig}/>
      <h1>DesignPage</h1>
      <h2>This is for designing pages</h2>
      <Table data={testIncomeStatementData} config={tableConfig}/>
    </>
  );
};

export default DesignPage;
