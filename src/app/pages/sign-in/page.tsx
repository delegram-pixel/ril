'use client';

import { useState, useCallback } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignIn = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Email not found. Please check your details.');
        } else {
            setError('');
            // Add your sign-in logic here
            console.log('Signing in with email:', email);
            router.push('/pages/otp');
        }
    }, [email, router]);

    return (
        <div className="flex justify-center items-center w-full h-screen overflow-hidden relative">
            <button onClick={() => router.back()} className="absolute top-4 left-4">
                <Image src="/back-arrow.svg" alt="Back" width={24} height={24} className="dark:invert" />
            </button> 
            <div className="flex flex-col items-center gap-10 p-8 w-full max-w-md z-10">
                <Image className="w-40 h-auto" width={160} height={72} alt="RIL logo" src="/RIL logo.svg" />
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-primary">Welcome to the Office</h1>
                    <p className="text-muted-foreground">Let&apos;s get you signed in</p>
                </div>
                <form className="w-full flex flex-col gap-5" onSubmit={handleSignIn}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="border border-input rounded-lg p-3 text-base focus:outline-2 focus:outline-ring"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-destructive text-sm -mt-2 mb-2 text-center">{error}</p>}
                    <button type="submit" className="bg-primary text-primary-foreground font-semibold py-4 px-3 rounded-lg cursor-pointer transition-colors hover:bg-primary/90">
                        Next
                    </button>
                </form>
            </div>
            <Image className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11/12 max-w-lg h-auto opacity-10 z-0" width={366} height={402} alt="background logo" src="/Logo (1).svg" />
        </div>
    );
};

export default SignIn;