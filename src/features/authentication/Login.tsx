import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useEffect, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import useLogin from './useLogin';
import Loader from '../../ui/Loader';
import axios from 'axios';

type FormData = {
    email: string;
    password: string;
};

function Login() {
    const [formData, setFormData] = useState<FormData>({
        email: 'frizi20@yahoo.com',
        password: 'password',
    });
    const [errors, setErrors] = useState<FormData>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { error: loginError, isLoading, login: loginUser } = useLogin();

    useEffect(() => {
        (async function () {
            const res = await axios.get('/', {
                baseURL:
                    'https://stormy-headland-49496-8b3c09f94668.herokuapp.com/',
                withCredentials:true
            });
            console.log(res);
        })();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    function login(e: React.FormEvent) {
        e.preventDefault();

        const isValid = validate(formData);

        if (isValid) {
            loginUser(formData);
        }
    }

    function validate(data: FormData) {
        const errors: FormData = { email: '', password: '' };

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(data.email)) {
            errors.email = 'Invalid email format!';
        }

        if (!data.email.trim()) {
            errors.email = 'This field is required!';
        }

        if (!data.password.trim()) {
            errors.password = 'This field is required!';
        }

        setErrors(errors);

        const isValid = Object.values(errors).every((val) => !val);
        return isValid;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="bg-white rounded-md p-5 shadow-lg">
                <h2 className="font-semibold text-xl text-center text-gray-500 py-4">
                    Log in to your account
                </h2>
                <form className="min-w-[300px]" onSubmit={login}>
                    <FormRow label="Email" error={errors.email}>
                        <input
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            disabled={isLoading}
                            autoFocus
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormRow>
                    <FormRow label="Password" error={errors.password}>
                        <input
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            disabled={isLoading}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div
                            className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-gray-600 select-none"
                            onClick={() => {
                                setShowPassword((prev) => !prev);
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </FormRow>
                    <Link
                        to="/register"
                        className="text-gray-500 underline text-center block py-3"
                    >
                        Don't have an account?
                        <span className="ml-2">Register</span>
                    </Link>
                    <div className="text-center mt-2">
                        <Button
                            size="small"
                            className="text-[1.1rem] mr-auto border border-gray-500 py-1 text-base font-semibold m-auto"
                        >
                            <span>Login</span>
                            {isLoading && <Loader size={5} width={2} />}
                        </Button>
                    </div>
                </form>
                {loginError && (
                    <div className="text-center py-2 mt-3.5 bg-red-100 text-red-500 rounded ">
                        {loginError}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
