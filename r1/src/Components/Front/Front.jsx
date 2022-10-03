import axios from "axios";
import { authConfig } from "../../Functions/auth";
import { useEffect, useState } from "react";
import FrontContext from "./FrontContext";
import List from "./List";
import Nav from "./Nav";
import SortFilter from "./SortFilter";

function Front() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(0);
  const [filter, setFilter] = useState(0);

  const [search, setSearch] = useState('');
  // const [rateNow, setRateNow] = useState(null);
  const doFilter = cid => {
    setCategory(cid);
    setFilter(parseInt(cid));
}

useEffect(() => {
  let query;
  if (filter === 0 && !search) {
      query = '';
  } else if (filter) {
      query = '?category-id=' + filter
  } else if (search) {
      query = '?s=' + search
  }


  axios.get('http://localhost:3003/books' + query, authConfig())
  .then(res => setBooks(res.data.map((b, i) => ({ ...b, row: i }))));
}, [filter, search]);

useEffect(() => {
axios.get('http://localhost:3003/categories', authConfig())
 .then(res => setCategories(res.data));
}, []);

  // CREATE RATE
  // useEffect(() => {
  //   if (null === rateNow) return;
  //   axios
  //     .put("http://localhost:3003/rates/" + rateNow.id, rateNow, authConfig())
  //     .then((_) => {
  //       setLastUpdate(Date.now());
  //     });
  // }, [rateNow]);

  return (
    <FrontContext.Provider
      value={{
        books,
        setBooks,
        categories,
        setFilter,
        category,
        setCategory,
        setSearch,
        doFilter
        // setRateNow
      }}
    >
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SortFilter />
          </div>
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;