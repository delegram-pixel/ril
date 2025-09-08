'use client';

import { useState, useCallback } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format.');
            return;
        }

        setError('');
        setLoading(true);
        
        try {
            const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
            const data = await response.json();

            if (response.ok) {
                // User exists, proceed to OTP page
                console.log('User data:', data);
                router.push(`/pages/otp?email=${encodeURIComponent(email)}`);
            } else {
                setError(data.error || 'Failed to sign in. Please try again.');
            }
        } catch (error) {
            console.error('Sign-in error:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [email, router]);

    return (
        <div className="flex justify-center items-center w-full h-screen overflow-hidden relative">
            <div className="flex flex-col items-center gap-10 p-8 w-full max-w-md z-10">
                <div className="w-40 h-auto relative dark:invert">
                    <Image width={160} height={72} alt="RIL logo" src="/RIL logo.svg" className="w-full h-auto" />
                </div>
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
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-destructive text-sm -mt-2 mb-2 text-center">{error}</p>}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-primary text-primary-foreground font-semibold py-4 px-3 rounded-lg cursor-pointer transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Next'}
                    </button>
                </form>
            </div>
            <Image className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11/12 max-w-lg h-auto opacity-10 z-0" width={366} height={402} alt="background logo" src="/Logo (1).svg" />
        </div>
    );
};

export default SignIn;
