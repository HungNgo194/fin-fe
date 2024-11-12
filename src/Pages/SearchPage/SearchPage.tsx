import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import CardList from '../../Components/CardList/CardList';
import Navbar from '../../Components/Navbar/Navbar';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import Search from '../../Components/Search/Search';

type Props = {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  
    const onPortfolioCreate = (e: any) => {
      e.preventDefault();
      //DO NOT DO THIS
      // portfolioValues.push(event.target[0].value)
      // setPortfolioValues(portfolioValues);
      const exists = portfolioValues.find((value) => value === e.target[0].value);
      if (exists) {
        setErrorMessage("Stock existed!");
        return;
      } else {
        setErrorMessage(null);
      }
      const updatedPortfolio = [...portfolioValues, e.target[0].value];
      setPortfolioValues(updatedPortfolio);
    };
  
    const onPortfolioDelete = (e: any) => {
      e.preventDefault();
      setErrorMessage(null)
      const removed = portfolioValues.filter((value) => {
        return value !== e.target[0].value;
      });
      setPortfolioValues(removed);
    };
  
    const onSearchSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await searchCompanies(search);
      //setServerError(result.data);
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.data)) {
        setSearchResult(result.data);
      }
    };
  
    return (
      <>
        <Search
          onSearchSubmit={onSearchSubmit}
          search={search}
          handleSearchChange={handleSearchChange}
        />
        <ListPortfolio
          portfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelete}
        />
        {errorMessage === null ? (
            <> </>
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Stock is existed.
            </h3>
          )}
        <CardList
          searchResults={searchResult}
          onPortfolioCreate={onPortfolioCreate}
        />
        {serverError && <div>Unable to connect to API</div>}
      </>
    );
}

export default SearchPage