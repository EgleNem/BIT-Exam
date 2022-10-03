import { useState, useContext } from "react";
import FrontContext from "./FrontContext";

function SortFilter() {
  const { setSearch } = useContext(FrontContext);

  const [s, setS] = useState('');

  const doSearch = e => {
    setS(e.target.value);
    setSearch(e.target.value);
  }



  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Search</h2>
      </div>
      <div className="card-body">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label>Type here</label>
                <input className="form-control" type='text' value={s} onChange={doSearch}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortFilter;