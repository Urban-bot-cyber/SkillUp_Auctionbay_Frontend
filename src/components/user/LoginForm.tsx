import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import { Controller } from 'react-hook-form'
import { Button, FormLabel } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const LoginForm = () => {
    const navigate = useNavigate()
    const { handleSubmit, errors, control } = useLoginForm()
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }

    const onSubmit = handleSubmit(async (data: LoginUserFields) => {
        const response = await API.singin(data)
        if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
            setApiError(response.data.message)
            setShowError(true)
        } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
            setApiError(response.data.message)
            setShowError(true)
        } else {
            authStore.login(response.data)
            navigate(routes.AUCTIONS)
        }
    })

    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <h2 className="display-5 fw-bold">Sing in</h2>
                <p className='text-center  w-75'>Welcome back to diploma. We are glad that you are back.</p>
                <Form className="login-form pt-0" onSubmit={onSubmit}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="example@gmail.com"
                                    aria-label="Email"
                                    aria-describedby="email"
                                    className={
                                        errors.email ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                    }
                                />
                                {errors.email && (
                                    <div className="invalid-feedback text-danger">
                                        {errors.email.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Form.Group className="mb-3 pb-3">
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <div className="input-group">
                                    <input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="******"
                                        aria-label="Password"
                                        aria-describedby="password"
                                        className={
                                            errors.password ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary form-rounded"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="invalid-feedback text-danger">
                                        {errors.password.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Button className="w-100 btn rounded-btn bright-yellow mb-2" type="submit">
                        Sing in
                    </Button>

                </Form>
                <div className="d-flex flex-column mb-4 pb-4">
                    <div className="d-flex justify-content-between">
                        <p className="mb-0 pe-5">Do you want to create an account?</p>
                        <Link className="text-decoration-none link-green ps-4" to={routes.SIGNUP}>
                            Sign Up
                        </Link>
                    </div>
                </div>

            </div>

            {showError && (
                <ToastContainer className="p-3" position="top-end">
                    <Toast onClose={() => setShowError(false)} show={showError}>
                        <Toast.Header>
                            <strong className="me-suto text-danger">Error</strong>
                        </Toast.Header>
                        <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </>
    )
}

export default LoginForm