import { Dispatch, SetStateAction } from "react";

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ search, setSearch }: Props) => {
  return (
    <div id="search" className="mr-4 w-1/4">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
