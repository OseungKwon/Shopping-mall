import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthForm from '../components/AuthForm'
import { registerUser } from '../modules/auth'

const RegisterPage = (props) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const { name, email, password, passwordConfirm } = form

    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.id]: e.target.value
        }
        setForm(nextForm)
    }
    const onSubmit = e => {
        e.preventDefault();

        let data = {
            name,
            lastName: 'user',
            email,
            password,
            passwordConfirm
        }
        console.log(data)
        dispatch(registerUser(data))
            .then(response => {
                if (response.payload.success) {
                    console.log(response)
                    props.history.push('/login')
                } else {
                    alert(response.payload.err.errmsg)
                }
            })

    }

    return (
        <div>
            <AuthForm
                type="register"
                onChange={onChange}
                onSubmit={onSubmit}

            />
        </div>
    )
}

export default RegisterPage
