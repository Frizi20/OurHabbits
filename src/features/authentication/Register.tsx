import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import useRegister from './useRegister';
import Loader from '../../ui/Loader';

interface FormData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

function Register() {
    const [formData, setFormData] = useState<FormData>({
        name: 'Frizi',
        email: 'frizi20@yahoo.com',
        password: 'password',
        repeatPassword: 'password',
    });
    const [errors, setErrors] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const { isLoading, error: registerError, registerUser } = useRegister();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function register(e: FormEvent) {
        e.preventDefault();
        const isValid = validate(formData);
        // const isValid = true;

        if (isValid) {
            registerUser(formData);
        } else {
            console.log('Erorrorors');
        }
    }

    function validate(data: FormData) {
        const errors: FormData = {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
        };
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        for (const key in data) {
            const value = data[key as keyof FormData];
            if (!value) {
                errors[key as keyof FormData] = `This field is required!`;
            }
        }

        if (data.password !== data.repeatPassword) {
            errors.repeatPassword = "Passwords don't match!";
        }

        if (data.password.length < 5) {
            errors.password = 'Minimum 5 caracters allowed!';
        }

        if (!regex.test(data.email.toLowerCase())) {
            errors.email = 'Invalid email format!';
        }

        setErrors(errors);

        const isValid = Object.values(errors).every((val) => !val);

        return isValid;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="bg-white rounded-md p-5 shadow-xl">
                <h2 className="font-semibold text-xl text-center text-gray-500 py-4">
                    Create a new account
                </h2>
                <form className="min-w-[350px]" onSubmit={register}>
                    <FormRow label="Name" error={errors.name}>
                        <input
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            disabled={isLoading}
                            autoFocus
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormRow>
                    <FormRow label="Email" error={errors.email}>
                        <input
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            disabled={isLoading}
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
                                if (isLoading) return;
                                setShowPassword((prev) => !prev);
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </FormRow>
                    <FormRow
                        label="Repeat password"
                        error={errors.repeatPassword}
                    >
                        <input
                            disabled={isLoading}
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            type={showRepeatPassword ? 'text' : 'password'}
                            name="repeatPassword"
                            id="repeat-password"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                        />
                        <div
                            className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-gray-600 select-none"
                            onClick={() => {
                                if (isLoading) return;
                                setShowRepeatPassword((prev) => !prev);
                            }}
                        >
                            {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </FormRow>
                    <Link
                        to="/login"
                        className="text-gray-500 underline block text-center py-3"
                    >
                        You have an account?
                        <span className="ml-2">Login </span>
                    </Link>
                    <div className="text-center mt-2 ">
                        <Button
                            size="small"
                            className="text-[1.1rem] mr-auto border border-gray-500 py-1 text-base font-semibold"
                        >
                            <div className="flex items-center gap-2">
                                <span>Register</span>
                                {isLoading && <Loader size={5} width={2} />}
                            </div>
                        </Button>
                    </div>
                </form>
                {registerError && (
                    <div className="text-center py-2 mt-3.5 bg-red-100 text-red-500 rounded">
                        {registerError}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
