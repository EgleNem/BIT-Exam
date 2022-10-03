import { useContext, useState } from "react";
import FrontContext from "./FrontContext";



function Line({ line }) {
  const { setRateNow } = useContext(FrontContext);

  const [rate, setRate] = useState("0");

  const rateIt = (e) => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: line.id,
    });
  };

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <p>
            Name: <b>{line.title}</b>&nbsp;
          </p>
          <p>
            Surname: <b>{line.author}</b>&nbsp;
          </p>
        
          <p>
            Category: <b>{line.category}</b>&nbsp;
          </p>
          <p>
            City: <b>{line.city}</b>
          </p>
          {line.photo ? (
            <div className="photo-bin">
              <img src={line.photo} alt="nice" />
            </div>
          ) : null}
        </div>
        <div className="rate mt-2">
          <label className="mr-2">Rate now!</label>
          <button className= "heart-shape" value={rate} onClick={rateIt}>
            
          </button>
          <p>
            {line.rates
              ? "Voters: " + line.rates
              : "No rates yet"}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Line;