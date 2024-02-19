import React from "react";
import { generationList,typesList,sortList } from "@/utils/optionList";
import { useSearchForm } from "@/components/Searchform";

const SearchForm = () => {
  const {fieldKeyword,fieldGenaration,fieldSort,fieldType} = useSearchForm();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-[20px] mt-[40px]">
      <div>
        <label
          htmlFor="generation"
          className="block mb-2 text-lg font-bold text-black"
        >
          Generation
        </label>

        <select
          {...fieldGenaration}
          id="generation"
          className="bg-[#217bc9] capitalize border-gray-300 border text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {generationList.map((item, index) => {
            return (
              <option
                className="capitalize"
                key={`generation-key-${index}`}
                value={index}
                selected
              >
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="type"
          className="block mb-2 text-lg font-bold text-black"
        >
          Type
        </label>

        <select
          {...fieldType}
          id="type"
          className="bg-[#217bc9] capitalize border-gray-300 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {typesList.map((item, index) => {
            return (
              <option
                className="capitalize"
                key={`type-key-${index}`}
                value={item}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="sort"
          className="block mb-2 text-lg font-bold text-black"
        >
          Sortlist
        </label>

        <select
          {...fieldSort}
          id="sort"
          className="bg-[#217bc9] capitalize border-gray-300 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {sortList.map((item, index) => {
            return (
              <option
                className="capitalize"
                key={`type-key-${index}`}
                value={item}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="generation"
          className="block mb-2 text-lg font-bold text-black"
        >
          Search
        </label>
        <input
          {...fieldKeyword}
          id="search"
          className="bg-[#217bc9] capitalize border-gray-300 border text-white text-sm rounded-lg text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        ></input>
      </div>
    </div>
  );
}

export default SearchForm