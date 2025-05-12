import SortDropdown from './SortDropdown';
import FilterOffcanvas from './FilterOffcanvas';
import Search from './Search';

function FilterSortSearch(props) {
  return (
    <>
      <Search products={props.products} />
      <FilterOffcanvas products={props.products} />
      <SortDropdown products={props.products} />
    </>
  );
}

export default FilterSortSearch;
