import React,{useState} from 'react';
import Image from 'next/image'
import Head from 'next/head'
import Link from "next/link"
import { useForm,SubmitHandler } from 'react-hook-form'
import useAuth,{ Iinput } from '../data/data';


const Signin = () => {
    const [userLogin,setUserLogin]= useState(false)
    const { logIn } = useAuth();
    //react hook form validation
    const { register, handleSubmit, formState: { errors } } = useForm<Iinput>();
    //when the user clicked button to login, do auth
    const onSubmit: SubmitHandler<Iinput> = async (data) => {
        userLogin && await logIn(data.email, data.password);
    };
    return (
        <div className='h-screen flex flex-col items-center justify-center  bg-[rgb(0,0,0,0.6)] relative w-screen'>
              <Head>
                <title>MyFlix</title>
            </Head>
            <Image className='signin-background'
                layout='fill' objectFit="cover" src="https://rb.gy/p2hphi" />
            
            <span className="icon" > MyFlix </span>
            <form  onSubmit={handleSubmit(onSubmit)}  className=' flex flex-col justify-center bg-black/40
                rounded-2xl relative p-[1rem] space-y-[3rem] 
                h-[24rem] w-[16rem] md:h-[28rem] md:w-[22rem] lg:h-[32rem] lg:w-[26rem]'>
                <h1 className=' absolute top-[13%] text-2xl text-[#ADDDD0]  font-bold'>Sign In</h1>
                <div className='absolute w-[80%] md:w-[90%] h-[50%] flex flex-col justify-around'>
                     <label htmlFor="Email" className='inline-block'>
                        <input {...register('email')} required className='input' type="email" placeholder="email" />
                    </label>
                    <label htmlFor="" className='inline-block'>
                        <input {...register('password')} required className='input' type="password" placeholder="Your password" />
                    </label>
                    <button onClick={()=>setUserLogin(true)} className="hover:scale-120 font-semibold bg-[#ADDDD0] w-[100%] h-[15%] rounded" type="submit">Sign in</button>
                </div>
                <span className='absolute bottom-5 text-[#ADDDD090] md:bottom-10 m-auto font-semibold '>Need an Account?
                    {" "} 
                    <Link href="/signup" ><a className='pl-2 text-[#ceeee6] hover:scale-120 underline font-bold text-1xl  md:text-2xl '> Sign Up</a></Link>
                </span>
            </form>
        </div>
    );
};


export default Signin;
