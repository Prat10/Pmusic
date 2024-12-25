import React from "react";
import { CiSearch } from "react-icons/ci";

export const Search = ({query,setQuery}) => {
  return (
    <div className="flex justify-center rounded-md mt-3 bg-[linear-gradient(180deg, #4B0000 0%, #00004B 200%)]">
      <input
        placeholder="Search Music ...."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-[#FFE5B4] w-[300px]  h-[50px] shadow-lg p-4 border-none bg-[#4B0000] sm:w-[300px] md:w-[400px] lg:w-[500px] sm:p-2 md:p-3 lg:p-4"
      />
      {/* <CiSearch className='text-3xl -mx-10 my-2 opacity-[30%] text-slate-50'/> */}
    </div>
  );
};
