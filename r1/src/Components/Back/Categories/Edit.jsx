import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {

    const { modalCategory, setModalCategory, setEditCategory } = useContext(BackContext);


    const [name, setName] = useState('');


    useEffect(() => {
        if (null === modalCategory) {
            return;
        }
        setName(modalCategory.name);
       

    }, [modalCategory]);

    const handleEdit = () => {
        const data = {name, id: modalCategory.id};
        setEditCategory(data);
        setModalCategory(null);
    }

    if (null === modalCategory) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit category</h5>
                        <button type="button" className="close" onClick={() => setModalCategory(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label> category Name</label>
                            <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} />
                            <small className="form-text text-muted">Enter category name here.</small>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button  onClick={() => setModalCategory(null)}>Close</button>
                        <button  onClick={handleEdit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;