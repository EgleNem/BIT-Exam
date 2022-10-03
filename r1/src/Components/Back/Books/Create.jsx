import { useContext, useState, useRef } from 'react';
import BackContext from '../BackContext';
import getBase64 from '../../../Functions/getBase64'

function Create() {

    const { categories, setCreateBooks, showMessage} = useContext(BackContext);

    const fileInput = useRef();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState("");
    const [reservation, setReservation] = useState('');
    const [photoPrint, setPhotoPrint] = useState(null);

    const handleCreate = () => {
        if ( category === '0') {
            showMessage({ text: 'Please, select category!', type: 'danger' });
            return;
        }

        const data = { 
            title, 
            author,  
            category,
            reservation ,
            photo: photoPrint
        };
        setCreateBooks(data);
        setTitle('');
        setAuthor('');
        setCategory('');
        setReservation('');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    
    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch((_) => {
        });
    }

   
    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Create new Book</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Ttile</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                    <small className="form-text text-muted">Enter books title here</small>
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" onChange={e => setAuthor(e.target.value)} value={author} />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" value={category} onChange={e => setCategory(e.target.value) }>
                        <option value="0">Please, select the category</option>
                        {
                            categories ? categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}</option>)) : null
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Reservation</label>
                    <input type="text" className="form-control" onChange={e => setReservation(e.target.value)} value={reservation} />
                    <small className="form-text text-muted">Is it reserved?</small>
                </div>
                <div className="form-group">
                    <label>Photo</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
                    <small className="form-text text-muted">Upload Photo</small>
                </div>
                {
                    photoPrint ? <div className="photo-bin"><img src={photoPrint} alt="nice"/></div> : null
                }
                <button type="button" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;