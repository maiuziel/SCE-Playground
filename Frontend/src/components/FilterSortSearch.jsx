import SortDropdown from './SortDropdown';
import FilterOffcanvas from './FilterOffcanvas';
import Search from './Search';

function FilterSortSearch(props) {
  return (
    <>
      <Search search={props.search} />
      <FilterOffcanvas
        categories={props.categories}
        minPrice={props.minPrice}
        maxPrice={props.maxPrice}
        filterByCategory={props.filterByCategory}
        filterByPrice={props.filterByPrice}
      />
      <SortDropdown
        sortHighToLow={props.sortHighToLow}
        sortLowToHigh={props.sortLowToHigh}
      />
    </>
  );
}

export default FilterSortSearch;
