import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Search } from "@material-ui/icons";
import { makeStyles, Toolbar, InputAdornment } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/usersAction'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Users() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)

    const { user, isAdmin } = auth
    const [data, setData] = useState(initialState)
    const { err, success } = data

    const [setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const handleSearch = e => {
        let target = e.target;
    }

    const handleDelete = async (id) => {
        try {
            if (user._id !== id) {
                if (window.confirm("Are you sure you want to delete this account?")) {
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: { Authorization: token }
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <>
            <div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading.....</h3>}
            </div>
            <div className="profile_page">
            </div>
            <div className="col-right">
                <h2 style={{ textAlign: "center", margin: "30px", fontSize: "60px", color: "#66a6ff" }}>{isAdmin ? "Users List" : "My Orders"}</h2>

                <div style={{ overflowX: "auto" }}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 1
                                                    ? <i className="fas fa-check" title="Admin"></i>
                                                    : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                                onClick={() => handleDelete(user._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Users