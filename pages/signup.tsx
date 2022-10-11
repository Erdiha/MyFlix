import React,{useState} from 'react';
import Image from 'next/image'
import Head from 'next/head'
import Link from "next/link"
import { useForm,SubmitHandler } from 'react-hook-form'
import { IRegister } from '../data/data';
import useAuth from '../data/data';

const Signup = () => {
    const {Register} = useAuth()
    const [userSignUp, setUserSignUp] = useState(false);
     const { register, handleSubmit, watch, formState: { errors } } = useForm<IRegister>();
    const onSubmit: SubmitHandler<IRegister> = async ({email,password,repassword}) =>  {
        if (password !== repassword) {
            alert("Password doesnt match");
        }
        else {
            userSignUp && await Register(email,password)
        }
  }

    return (
        <div className='h-screen flex flex-col items-center justify-center  bg-[rgb(0,0,0,0.6)] relative w-screen'>
              <Head>
                <title>MyFlix</title>
            </Head>
            <Image className='signin-background'
                layout='fill' objectFit="cover" src="https://rb.gy/p2hphi" />
            
      <span className="icon" > MyFlix </span>
            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col justify-center bg-black/40
                rounded-2xl relative p-[1rem] space-y-[3rem] 
                h-[28rem] w-[17rem] md:h-[30rem] md:w-[22rem] lg:h-[33rem] lg:w-[26rem]'>
                <h1 className=' absolute  text-[#ADDDD0] top-[13%] text-3xl  font-bold'>Register</h1>
                <div className=' w-full md:w-[85%] h-[50%] flex flex-col justify-around gap-2'>
                        <input {...register('email')} required className='input' type="email" placeholder="Email" />                 
                        <input {...register('password')} required className='input' type="password" placeholder="Your Password" />
                        <input {...register('repassword')} required className='input' type="password" placeholder="Confirm Password" />
                        <button onClick={()=>setUserSignUp(true)} className="mt-5 font-semibold bg-[#ADDDD0] w-[100%] h-[15%] rounded" type="submit">Sign up</button>
                </div>
                <span className='absolute bottom-5 md:bottom-10 text-[#ADDDD090] font-semibold '>Have an Account?
                    {" "} 
                    <Link href="/signin" ><a className='pl-2  text-[#ADDDD0] hover:scale-120 underline font-bold text-1xl  md:text-2xl '> Sign In</a></Link>
                </span>
            </form>
        </div>
    );
};


export default Signup;
