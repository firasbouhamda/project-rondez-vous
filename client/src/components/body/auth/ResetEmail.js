import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import {isEmail} from '../../utils/validation/Validation'


const initialState = {
    email: '',
    err: '',
    success: ''
}

function ResetEmail() {
    const [data, setData] = useState(initialState)
    const { token } = useParams()

    const { email, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }


    const handleResetEmail = async () => {
        if (!isEmail(email))
            return setData({ ...data, err: "Please enter a valid email", success: '' })


        try {
            const res = await axios.post('/user/resetEmail', { email }, {
                headers: { Authorization: token }
            })

            return setData({ ...data, err: "", success: res.data.msg })

        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }

    }


    return (
        <div className="fg_pass">
            <h2>Reset Your Email</h2>

            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email}
                    onChange={handleChangeInput} />

                <button onClick={handleResetEmail}>Reset Email</button>
            </div>
        </div>
    )
}

export default ResetEmail