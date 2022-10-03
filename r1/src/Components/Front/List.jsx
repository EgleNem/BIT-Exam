import { useContext } from "react";
import Line from "./Line";
import FrontContext from "./FrontContext";

function List() {

    const { books } = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2> Books' list</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    books ? books.map(book => <Line key={book.id} line={book}></Line>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;