import { useContext } from 'react';
import BackContext from '../BackContext';



function Line({ line }) {

    const { setDeleteBooks, setModalBooks} = useContext(BackContext);



    const handleDelete = () => {
        setDeleteBooks(line);
    }

    const handleEdit = () => {
        setModalBooks(line);
    }

   

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.title}</b> &nbsp; 
                    <b>{line.author}</b> &nbsp; 
                    <i>Reservation: {line.reservation} </i>
                    
                    <div className="cat">{line.category}</div>&nbsp; 
                  
                   
                    {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.name} /></div> : null
                    }
                   
                </div>
                <div className="buttons">
                    <button type="button" onClick={handleEdit}>Edit</button>
                    <button type="button"  onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Line;