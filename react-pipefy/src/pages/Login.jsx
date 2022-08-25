import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as Eye } from '../assets/eye.svg';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div
            className="flex justify-center w-full py-9"
            style={{ backgroundColor: '#f2f2f2' }}
        >
            <div className="bg-white px-14 py-8" style={{ width: '440px' }}>
                <div className="text-2xl text-center font-medium">
                    Log in to your account
                </div>
                <form
                    className="flex flex-col w-full h-96 px-8 pt-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="overflow-auto pb-3">
                        <div className="flex flex-col pb-3">
                            <input
                                className={`${
                                    errors.email ? 'border-red-900 ' : ''
                                }h-14 w-full rounded px-4 items-center text-sm border outline-none hover:bg-white hover:border-blue-600`}
                                type="text"
                                {...register('email')}
                                placeholder="Username or Email"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center border">
                                <input
                                    className="h-14 w-full rounded px-4 items-center text-sm outline-none hover:bg-white hover:border-blue-600"
                                    type={showPassword ? 'password' : 'text'}
                                    {...register('password')}
                                    placeholder="Your password..."
                                />

                                <Eye className="invert-0" />
                            </div>
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Log In"
                        className="py-4 mx-8 mb-8 rounded bg-blue-900 hover:bg-blue-400 text-gray-100 text-center"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
