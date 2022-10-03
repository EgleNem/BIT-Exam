import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import BackContext from "./BackContext";
import Messages from "./Messages";

function Nav() {


    return (
        <>
        <div className=" nav-header">
            <div className="row">
                <div className="col-12">
                    <nav className="nav">
                        <NavLink to="/admin/" className="nav-link" style={
                            ({ isActive }) =>
                                isActive ? {
                                    color: 'orange'
                                } : null
                        }>Admin</NavLink>
                        <NavLink to="/admin/categories" className="nav-link" style={
                            ({ isActive }) =>
                                isActive ? {
                                    color: 'orange'
                                } : null
                        }>Categories</NavLink>
                        <NavLink to="/admin/books" className="nav-link" style={
                            ({ isActive }) =>
                                isActive ? {
                                    color: 'orange'
                                } : null
                        }>Books</NavLink>
                       
                            <Link to="/logout">Logout</Link>
                    </nav>
                </div>
               
                    <Messages/>

              
            </div>
        </div>
        </>
    )
}

export default Nav;