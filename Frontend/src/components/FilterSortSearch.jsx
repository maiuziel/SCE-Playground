import SortDropdown from './SortDropdown';
import FilterOffcanvas from './FilterOffcanvas';
import Search from './Search';

function FilterSortSearch(props) {
  return (
    <>
      <Search
        allProducts={props.allProducts}
        setDisplayedProducts={props.setDisplayedProducts}
        setLastSearchTerm={props.setLastSearchTerm}
      />
      <FilterOffcanvas
        displayedProducts={props.displayedProducts}
        setDisplayedProducts={props.setDisplayedProducts}
        setFilteredProducts={props.setFilteredProducts}
        isAdmin={props.isAdmin}
      />
      <SortDropdown
        displayedProducts={props.displayedProducts}
        setDisplayedProducts={props.setDisplayedProducts}
        isAdmin={props.isAdmin}
      />
    </>
  );
}

export default FilterSortSearch;
