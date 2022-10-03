import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from "../../../Functions/getBase64";

function Edit() {

    const { modalBooks, setEditBooks, setModalBooks, categories, setDeletePhoto } = useContext(BackContext);

    const fileInput = useRef();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState("");
    const [reservation, setReservation] = useState('');
    const [photoPrint, setPhotoPrint] = useState(null);



    useEffect(() => {
        if (null === modalBooks) {
            return;
        }
        setTitle(modalBooks.title);
        setAuthor(modalBooks.author);
        setCategory(categories.filter(category => category.name === modalBooks.category)[0].id);
        setReservation(modalBooks.reservation);
        setPhotoPrint(modalBooks.photo);
    }, [modalBooks, categories]);
   
    
    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
           
        })
    }

 



    const handleEdit = () => {
        const data = {
            title: title,
            id: modalBooks.id,
            author: author,
            reservation,
            category: parseInt(category),
            photo: photoPrint
          
        };
        console.log(data);
        setEditBooks(data);
        setModalBooks(null);
    }

    
    const handleDeletePhoto = () => {
        setDeletePhoto({id: modalBooks.id});
        setModalBooks(p => ({...p, photo: null}));
        setPhotoPrint(null);
    }
    if (null === modalBooks) {
        return null;
    }
    return (
        <div className="modal">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit book's account</h5>
              <button
                type="button"
                className="close"
                onClick={() => setModalBooks(null)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                    <small className="form-text text-muted">Enter name here.</small>
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" onChange={e => setAuthor(e.target.value)} value={author} />
                    <small className="form-text text-muted">Enter author's name.</small>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" onChange={e => setCategory(e.target.value)} value={category}>
                        <option value="0">Please, select the category</option>
                        {
                            categories ? categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}</option>)) : null
                        }
                    </select>
                    <small className="form-text text-muted">Select category here.</small>
                </div>
                <div className="form-group">
                    <label>Reservation</label>
                    <input type="text" className="form-control" onChange={e => setReservation(e.target.value)} value={reservation} />
                    <small className="form-text text-muted">Enter city.</small>
                </div>
                <div className="form-group">
                    <label>Photo</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
                    <small className="form-text text-muted">Upload Photo.</small>
                </div>
                {
                    photoPrint ? <div className="photo-bin"><img src={photoPrint} alt="nice"/></div> : null
                }
                </div>
                <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Delete photo</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalBooks(null)}>Close</button>
          </div>
            </div>
        </div>
        </div>
    );
}

export default Edit;