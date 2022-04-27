import React from "react";
import { SearchWidget } from "./SearchWidget";
import { SalesEvidenceSearchWidget } from "./SalesEvidenceSearchWidget";
import { LeasesSearch } from "./LeasesSearch";
import {
  DEFAULT_SEARCH_PARAMS,
  IntersectedSearchAndFilterParams,
  UnprocessedResultsFromCRM,
} from "../types";

type SearchWidgetProps = {
  searchParameters: IntersectedSearchAndFilterParams[];
  changeSearchParameters: (
    newParameters: IntersectedSearchAndFilterParams[]
  ) => void;
  setReadyForSearch: (isReady: boolean) => void;
  setFilterInUse: (stateChange: string) => void;
  filterInUse: string;
  updateResults: (results: UnprocessedResultsFromCRM[]) => void;
  mapFullScreen: boolean
};

export function SearchWidgetsWrapper(props: SearchWidgetProps) {
  return (
    <div className={props.mapFullScreen ? 'main-wrapper-fw' : 'main-wrapper'}>
      {props.filterInUse === "BaseFilter" &&
        props.searchParameters.map((searchParameters, idx) => {
          return (
            <div className="search-params-wrapper" key={searchParameters.id}>
              <SearchWidget
                setFilterInUse={props.setFilterInUse}
                filterInUse={props.filterInUse}
                updateResults={props.updateResults}
                searchParameters={searchParameters}
                setReadyForSearch={props.setReadyForSearch}
                changeSearchParametersForm={props.changeSearchParameters}
                changeSearchParameters={(newSearchParams) => {
                  const updatedSearchParams = [...props.searchParameters];
                  updatedSearchParams[idx] = newSearchParams;
                  props.changeSearchParameters(updatedSearchParams);
                }}
              />

              <div className="button-wrapper-1 hide-show-buttons">
                <button
                  className="search-button"
                  onClick={(e) => {
                    props.setReadyForSearch(true);
                    e.preventDefault();
                    return false;
                  }}
                >
                  Search
                </button>
                <div className="control-buttons">
                  <button
                    className="secondary"
                    onClick={() => {
                      const id = `search:${Math.random() * 1000}`;
                      props.changeSearchParameters(
                        props.searchParameters.concat([
                          { ...DEFAULT_SEARCH_PARAMS, id },
                        ])
                      );
                    }}
                  >
                    Add New Search Group
                  </button>
                  &nbsp;
                  <button
                    className="danger"
                    onClick={() => {
                      const updatedSearchParams = [...props.searchParameters];
                      updatedSearchParams.splice(idx, 1);
                      props.changeSearchParameters(updatedSearchParams);
                    }}
                  >
                    Remove Search Group
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {props.filterInUse === "SalesEvidenceFilter" && (
        <div
          className="search-params-wrapper"
          key={props.searchParameters[0].id}
        >
          <SalesEvidenceSearchWidget
            setReadyForSearch={props.setReadyForSearch}
            setFilterInUse={props.setFilterInUse}
            filterInUse={props.filterInUse}
            updateResults={props.updateResults}
            changeSearchParametersForm={props.changeSearchParameters}
            searchParameters={props.searchParameters[0]}
            changeSearchParameters={(newSearchParams) => {
              const updatedSearchParams = [...props.searchParameters];
              updatedSearchParams[0] = newSearchParams;
              props.changeSearchParameters(updatedSearchParams);
            }}
          />
        </div>
      )}
      {props.filterInUse === "LeasesEvidenceFilter" && (
        <div
          className="search-params-wrapper"
          key={props.searchParameters[0].id}
        >
          <LeasesSearch
            setReadyForSearch={props.setReadyForSearch}
            setFilterInUse={props.setFilterInUse}
            filterInUse={props.filterInUse}
            updateResults={props.updateResults}
            changeSearchParametersForm={props.changeSearchParameters}
            searchParameters={props.searchParameters[0]}
            changeSearchParameters={(newSearchParams) => {
              const updatedSearchParams = [...props.searchParameters];
              updatedSearchParams[0] = newSearchParams;
              props.changeSearchParameters(updatedSearchParams);
            }}
          />
        </div>
      )}
      {props.filterInUse !== "BaseFilter" && (
        <div className="button-wrapper hide-show-buttons">
          <button
            className="search-button-2"
            onClick={(e) => {
              props.setReadyForSearch(true);
              e.preventDefault();
              return false;
            }}
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}
