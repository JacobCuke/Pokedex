import { REGIONS, TYPES, SORT_BY } from "../constants/constants";

const Filters = ({ filters, updateFilters }) => {
  return (
    <div>
      <select
        value={filters.region}
        onChange={(e) => updateFilters({ region: e.target.value })}
      >
        {REGIONS.map((region) => (
          <option key={region} value={region}>
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </option>
        ))}
      </select>
      <select
        value={filters.type}
        onChange={(e) => updateFilters({ type: e.target.value })}
      >
        {TYPES.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <select
        value={filters.sortBy}
        onChange={(e) => updateFilters({ sortBy: e.target.value })}
      >
        {SORT_BY.map((sortMethod) => (
          <option key={sortMethod} value={sortMethod}>
            {sortMethod.charAt(0).toUpperCase() + sortMethod.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="text"
        onChange={(e) => updateFilters({ searchTerm: e.target.value })}
      />
    </div>
  );
};

export default Filters;
