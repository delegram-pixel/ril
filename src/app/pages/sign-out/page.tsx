'use client';

import { useCallback } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SignOut = () => {
    const router = useRouter();

    const handleSignOut = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        // Add your sign-out logic here
        console.log('Signing out...');
        router.push('/pages/otp');
    }, [router]);

    return (
        <div className="flex justify-center items-center w-full h-screen overflow-hidden relative">
            <button onClick={() => router.back()} className="absolute top-4 left-4">
                <Image src="/back-arrow.svg" alt="Back" width={24} height={24} className="dark:invert" />
            </button>
            <div className="flex flex-col items-center gap-10 p-8 w-full max-w-md z-10">
                <Image className="w-40 h-auto" width={160} height={72} alt="RIL logo" src="/RIL logo.svg" />
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-primary">Sign Out</h1>
                    <p className="text-muted-foreground">Are you sure you want to sign out?</p>
                </div>
                <form className="w-full flex flex-col gap-5" onSubmit={handleSignOut}>
                    <button type="submit" className="bg-primary text-primary-foreground font-semibold py-4 px-3 rounded-lg cursor-pointer transition-colors hover:bg-primary/90">
                        Sign Out
                    </button>
                </form>
            </div>
            <Image className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11/12 max-w-lg h-auto opacity-10 z-0" width={366} height={402} alt="background logo" src="/Logo (1).svg" />
        </div>
    );
};

export default SignOut;