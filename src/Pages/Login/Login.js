import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import google from '../../assets/Social icon/google.png';
import github from '../../assets/Social icon/github.png';
import Loading from '../Shred/Loading/Loading';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
    const [signInWithGithub, user2, loading2, error2] = useSignInWithGithub(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if(user || user1 || user2){
        navigate(from, { replace: true });
        console.log(user);
      }

    if (loading || loading1 || loading2) {
        return <Loading></Loading>
    }

    if(error || error1 || error2){
        signInError= <p className='text-red-500'><small>{error?.message || error1?.message }</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }


    return (
        <div className='flex h-screen justify-center items-center'>
        <div className="card lg:w-96 md:w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 style={{fontFamily:"aleo"}} className="text-center text-black text-2xl font-bold">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>

                    {signInError}
                    <input className='btn w-full max-w-xs text-white' type="submit" value="Login" />
                </form>
                <p className='text-black text-center'><small>New to Globe Tech? <Link className='text-primary' to="/signup">Create New Account</Link></small></p>
                <div className="divider text-black"><small>or</small></div>
                <button
                    onClick={() => signInWithGoogle()}
                    className="btn btn-outline"
                >
                    <img className='w-6 mr-3' src={google} alt="" />
                    Continue with Google</button>
                
                <button
                    onClick={() => signInWithGithub()}
                    className="btn btn-outline"
                >
                    <img className='w-max mr-3' src={github} alt="" />
                    Continue with Github</button>
            </div>
        </div>
    </div >
    );
};

export default Login;