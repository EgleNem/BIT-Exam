import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {

    const { setCreateCategory} = useContext(BackContext);

    const [name, setName] = useState('');

    const handleCreate = () => {
        const data = {name};
        setCreateCategory(data);
        setName('');
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Create new Category</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} />
                    <small className="form-text text-muted">Enter category name here.</small>
                </div>
                <button type="button"  onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;