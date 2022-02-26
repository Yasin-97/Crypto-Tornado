import React from "react";
import { screen } from "@testing-library/react";
import ReactPaginate from "react-paginate";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRedux } from "../../../../testUtils";
import CryptoCurrencies from "../CryptoCurrencies";
import { useGetCryptosQuery } from "../../../../store/apis/cryptoApi";
import usePagination from "../../../custom hook/usePagination";
import {testingCoins} from '../../../../../testingData'

jest.mock("../../../../store/apis/cryptoApi", () => ({useGetCryptosQuery: jest.fn()}));
jest.mock("../../../custom hook/usePagination");



describe("cryptoCurrencies", () => {
  beforeEach(() => {
    useGetCryptosQuery.mockImplementation(() => ({}));
    usePagination.mockImplementation(() => ({}));
  });

  test("Cryptocurrencies' loading state", () => {
    useGetCryptosQuery.mockImplementation(() => ({
      isFetching: true,
    }));

    usePagination.mockImplementation(() => ({
      setInputData: jest.fn(),
      paginate: "mocked paginate",
      currentPageData: null,
    }));

    renderWithRedux(<CryptoCurrencies number={10} />);

    expect(screen.getByRole("loading")).toBeInTheDocument();
  });

  test("Error to get Cryptocurrencies", () => {
    useGetCryptosQuery.mockImplementation(() => ({
      isError: true,
    }));

    usePagination.mockImplementation(() => ({
      setInputData: jest.fn(),
      paginate: "mocked paginate",
      currentPageData: null,
    }));

    renderWithRedux(<CryptoCurrencies number={10} />);

    expect(
      screen.getByText(/Failed to get Cryptocurrencies! try to refetch./i)
    ).toBeInTheDocument();
  });

  test("render cards successfully neither with pagination nor searchbar ", () => {

    usePagination.mockImplementation(() => ({
      setInputData: jest.fn(),
      paginate: "mocked paginate",
      currentPageData:testingCoins.data.coins.filter(coin=>coin.rank<=10),
    }));

    renderWithRedux(<CryptoCurrencies number={10} />);

    expect(screen.getAllByRole("crypto-card-container").length).toBe(10);
    expect(screen.queryByRole('crypto-searchbar')).not.toBeInTheDocument()
    expect(screen.queryByRole('pagination-component')).not.toBeInTheDocument() 
  });

  test("render cards successfully with pagination and searchbar ", () => {

    usePagination.mockImplementation(() => ({
      setInputData: jest.fn(),
      paginate:<ReactPaginate role='pagination-component'
      pageCount={5}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={jest.fn()}
      previousLabel="prev"
      nextLabel="next"
      breakLabel="..."
      breakClassName="break-me"
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />,
      currentPageData:testingCoins.data.coins.filter(coin=>coin.rank<=20),
    }));

    renderWithRedux(<CryptoCurrencies />);

    expect(screen.getAllByRole("crypto-card-container").length).toBe(20);
    expect(screen.getByText(/next/i)).toBeInTheDocument()
    expect(screen.getByText(/prev/i)).toBeInTheDocument()
    expect(screen.getByText(/bitcoin/i)).toBeInTheDocument()
  });
});
