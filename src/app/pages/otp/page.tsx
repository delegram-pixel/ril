'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleOtpVerification = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) {
            setError('Please enter the OTP.');
        } else {
            setError('');
            // Add your OTP verification logic here
            console.log('Verifying OTP:', otp);
            setIsSuccess(true);
        }
    }, [otp]);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                router.push('/'); // Redirect to homepage after 3 seconds
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, router]);

    return (
        <div className="flex justify-center items-center w-full h-screen overflow-hidden relative">
            <button onClick={() => router.back()} className="absolute top-4 left-4">
                <Image src="/back-arrow.svg" alt="Back" width={24} height={24} className="dark:invert" />
            </button>
            <div className="flex flex-col items-center gap-10 p-8 w-full max-w-md z-10">
                <div className="w-40 h-auto relative dark:invert">
                    <Image width={160} height={72} alt="RIL logo" src="/RIL logo.svg" className="w-full h-auto" />
                </div>
                {isSuccess ? (
                    <div className="text-center flex flex-col items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-2xl font-semibold text-primary">OTP Verified!</h1>
                        <p className="text-muted-foreground">You will be redirected shortly.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold text-primary">Enter OTP</h1>
                            <p className="text-muted-foreground">A 6-digit code has been sent to your email.</p>
                        </div>
                        <form className="w-full flex flex-col gap-5" onSubmit={handleOtpVerification}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="otp" className="font-semibold">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    placeholder="Enter your 6-digit OTP"
                                    className="border border-input rounded-lg p-3 text-base focus:outline-2 focus:outline-ring"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                />
                            </div>
                            {error && <p className="text-destructive text-sm -mt-2 mb-2 text-center">{error}</p>}
                            <button type="submit" className="bg-primary text-primary-foreground font-semibold py-4 px-3 rounded-lg cursor-pointer transition-colors hover:bg-primary/90">
                                Verify
                            </button>
                        </form>
                    </>
                )}
            </div>
            <Image className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11/12 max-w-lg h-auto opacity-10 z-0" width={366} height={402} alt="background logo" src="/Logo (1).svg" />
        </div>
    );
};

export default Otp;