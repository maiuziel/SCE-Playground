import SortDropdown from './SortDropdown';
import FilterOffcanvas from './FilterOffcanvas';
import Search from './Search';

function FilterSortSearch(props) {
  return (
    <>
      <Search
        allProducts={props.allProducts}
        setDisplayedProducts={props.setDisplayedProducts}
      />
      <FilterOffcanvas
        allProducts={props.allProducts}
        setDisplayedProducts={props.setDisplayedProducts}
      />
      <SortDropdown
        displayedProducts={props.displayedProducts}
        setDisplayedProducts={props.setDisplayedProducts}
      />
    </>
  );
}

export default FilterSortSearch;
