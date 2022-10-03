
import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function SortFilter() {

    const [sortBy, setSortBy] = useState('default');
    const { setBooks, books, categories, doFilter, category, setSearch} = useContext(FrontContext);

    const [s, setS] = useState('');


    
    const doSearch = e => {
        setS(e.target.value);
        setSearch(e.target.value);
    }


    const doSort = e => {
        setSortBy(e.target.value);
        const b = [...books]
        switch (e.target.value) {
            case 'ascTitle':
                b.sort((a, b) => {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                });
                break;
            case 'descTitle':
                b.sort((a, b) => {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                });
                break;
           
            default:
                b.sort((a, b) => a.row - b.row);
        }
        setBooks(b);
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Sort and Filter</h2>
            </div>
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label>Sort By</label>
                                <select className="form-control" value={sortBy} onChange={doSort}>
                                    <option value="default">Default Sort</option>
                                    <option value="ascTitle">Title A-Z</option>
                                    <option value="descTitle">Title Z-A</option>
                                   
                                </select>
                            </div>
                        </div>
                        <div className="col-4">

                            <div className="form-group">
                                <label>Filter by Categories</label>
                                <select className="form-control" onChange={e =>doFilter(e.target.value)} value={category}>
                                    <option value="0">All Categories</option>
                                    {
                                        categories ? categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>) : null
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label>Search</label>
                                <input className="form-control" type="text" value={s} onChange={doSearch} />
                            </div>
                        </div>
  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortFilter;