import { useState, useEffect } from 'react';
import BackContext from './BackContext';
import CategoriesCrud from './Categories/Crud';
import Nav from './Nav';
import BooksCrud from './Books/Crud';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { authConfig } from '../../Functions/auth';


function Back({ show }) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [messages, setMessages] = useState([]);

    const [categories, setCategories] = useState(null);
    const [createCategory, setCreateCategory] = useState(null);
    const [deleteCategory, setDeleteCategory] = useState(null);
    const [editCategory, setEditCategory] = useState(null);
    const [modalCategory, setModalCategory] = useState(null);

    const [deletePhoto, setDeletePhoto] = useState(null);
    const [books, setBooks] = useState(null);
    const [createBooks, setCreateBooks] = useState(null);
    const [deleteBooks, setDeleteBooks] = useState(null);
    const [editBooks, setEditBooks] = useState(null);
    const [modalBooks, setModalBooks] = useState(null);


    // Read 
    useEffect(() => {
        axios.get('http://localhost:3003/admin/categories', authConfig())
            .then(res => setCategories(res.data));
    }, [lastUpdate]);
    useEffect(() => {
        axios.get('http://localhost:3003/admin/books', authConfig())
            .then(res => setBooks(res.data));
    }, [lastUpdate]);


    // Create
    useEffect(() => {
        if (null === createCategory) return;
        axios.post('http://localhost:3003/admin/categories', createCategory, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [createCategory]);
    
    useEffect(() => {
        if (null === createBooks) return;
        axios.post('http://localhost:3003/admin/books', createBooks, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [createBooks]);

    // Delete
    useEffect(() => {
        if (null === deleteCategory) return;
        axios.delete('http://localhost:3003/admin/categories/' + deleteCategory.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteCategory]);
    
    useEffect(() => {
        if (null === deleteBooks) return;
        axios.delete('http://localhost:3003/admin/books/' + deleteBooks.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteBooks]);


    // Edit
    useEffect(() => {
        if (null === editCategory) return;
        axios.put('http://localhost:3003/admin/categories/' + editCategory.id, editCategory, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editCategory]);
   
   
    useEffect(() => {
        if (null === editBooks) return;
        axios.put('http://localhost:3003/admin/books/' + editBooks.id, editBooks, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editBooks]);


    //PHOTO
    useEffect(() => {
        if (null === deletePhoto) return;
        axios.delete('http://localhost:3003/admin/photos/' + deletePhoto.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deletePhoto]);


    const showMessage = (b) => {
        const id = uuidv4();
        b.id = id;
        setMessages(msg => [...msg, b]);
        setTimeout(() => {
            setMessages(mes => mes.filter(ms => ms.id !== id))
        }, 1000);
    }



    return (
        <BackContext.Provider value={{
            setCreateCategory,
            categories,
            setDeleteCategory,
            messages,
            setEditCategory,
            setModalCategory,
            modalCategory,
            setCreateBooks,
            books,
            showMessage,
            setDeleteBooks,
            setEditBooks,
            setModalBooks,
            modalBooks,
            setDeletePhoto
          
        }}>
            {
                show === 'admin' ?
                    <>
                        <Nav />
                        <h1>Welcome to the Library!
                        
                        </h1>
            
                    </>
                    : show === 'categories' ? <CategoriesCrud /> 
                       : show === 'books' ? <BooksCrud /> : null
            }
        </BackContext.Provider>
    )
}
export default Back;

