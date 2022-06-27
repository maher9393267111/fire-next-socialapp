import React from 'react';
import auth from '../../firebase';
import {useRouter} from 'next/router';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// navigate from next


const Registration = () => {
    const router = useRouter();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    
    if(user){
        router.push('/');
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
// change email to lowercase
 const email = event.target.email.value.toLowerCase();

      
        const password = event.target.password.value;
        createUserWithEmailAndPassword(email, password);
    }
    return (
        <div className='text-center mt-12'>
            <h1 className='text-2xl mb-4'>Registration Here</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='myName' placeholder="Your name" className="input input-bordered input-info w-full max-w-xs mt-4"/><br />
                <input type="email" name='email' placeholder="your email" className="mt-4 input input-bordered input-info w-full max-w-xs" required /><br />
                <input type="password" name='password' placeholder="your password" className="mt-4 input input-bordered input-info w-full max-w-xs" required /><br />
                {
                    loading && <p className='text-secondary'>Loading...</p>
                }
                <p className='text-secondary'>{error?.message}</p>
                <input type="submit" className="btn btn-primary mt-4 w-full max-w-xs" />
            </form>

            <p className='mt-2'>Already have an account? <span onClick={() => router.push('/login')} className='text-sm text-primary'>Login Please</span></p>
            
            <div class="flex flex-col w-full max-w-xs mx-auto border-opacity-50"> 
                <div class="divider">OR</div>
            </div>

            {/* <SocialLogin /> */}
            
        </div>
    );
};

export default Registration;