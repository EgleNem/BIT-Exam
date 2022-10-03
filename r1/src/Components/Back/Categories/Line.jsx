import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {

    const { setDeleteCategory, setModalCategory} = useContext(BackContext);
   

    const handleDelete = () => {
        setDeleteCategory(line);
    }

    const handleEdit = () => {
        setModalCategory(line)
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.name}</b> 
                </div>
                <div className="buttons">
                    <button type="button"  onClick={handleEdit}>Edit</button>
                    <button type="button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Line;