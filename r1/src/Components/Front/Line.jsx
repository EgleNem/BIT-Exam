import { useContext, useState } from "react";
import rand from "../../Functions/rand";
import FrontContext from "./FrontContext";

function Line({ line }) {
  const { setRateNow, doFilter } = useContext(FrontContext);

  const [rate, setRate] = useState("0");

  const rateIt = (e) => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: line.id,
    });
  };

  const reserveBook = () => {
    reservation: rand(0, 1);
  };

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <p>
            Title: <b>{line.title}</b>&nbsp;
          </p>
          <p>
            Author: <b>{line.author}</b>&nbsp;
          </p>

          <div className="cat" onClick={() => doFilter(line.cid)}>
            {line.category}
          </div>&nbsp;

          <button onClick={reserveBook}>
            Reserve
            {/* <b>{line.reservation}</b> */}
          </button>
          {line.photo ? (
            <div className="photo-bin">
              <img src={line.photo} alt="nice" />
            </div>
          ) : null}
        </div>
        {/* <div className="rate mt-2">
          <label className="mr-2">Rate now!</label>
          <button className= "heart-shape" value={rate} onClick={rateIt}>
            
          </button>
          <p>
            {line.rates
              ? "Voters: " + line.rates
              : "No rates yet"}
          </p>
        </div> */}
      </div>
    </li>
  );
}

export default Line;
