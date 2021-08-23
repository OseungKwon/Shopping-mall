import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'
import { useDispatch } from 'react-redux'
import { loginUser } from '../modules/auth'

const LoginPage = (props) => {
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const { email, password } = form;

    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.id]: e.target.value
        }
        setForm(nextForm);
    }

    const onSubmit = e => {
        e.preventDefault();

        let data = {
            email,
            password
        }
        dispatch(loginUser(data))
            .then(res => {
                if (res.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert('Check out your Account or Password again')
                }
            })
    }


    return (
        <AuthForm
            type="login"
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default LoginPage
