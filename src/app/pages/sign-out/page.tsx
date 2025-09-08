'use client';

import { useCallback, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SignOut = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSignOut = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Get current user session
            const sessionRes = await fetch('/api/auth/session');
            const sessionData = await sessionRes.json();
            
            if (!sessionData?.user?.id) {
                throw new Error('No active session found');
            }

            // Record sign-out time
            const attendanceRes = await fetch('/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: sessionData.user.id,
                    action: 'signout' 
                }),
            });

            if (!attendanceRes.ok) {
                throw new Error('Failed to record sign-out time');
            }

            // Clear session
            await fetch('/api/auth/signout', { method: 'POST' });
            
            setIsSuccess(true);
            
            // Redirect to sign-in page after a short delay
            setTimeout(() => {
                router.push('/pages/sign-in');
            }, 2000);
            
        } catch (err) {
            console.error('Sign out error:', err);
            setError('Failed to sign out. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [router]);

    return (
        <div className="flex justify-center items-center w-full h-screen overflow-hidden relative">
            <div className="flex flex-col items-center gap-10 p-8 w-full max-w-md z-10">
                <div className="w-40 h-auto relative dark:invert">
                    <Image width={160} height={72} alt="RIL logo" src="/RIL logo.svg" className="w-full h-auto" />
                </div>
                
                {isSuccess ? (
                    <div className="text-center flex flex-col items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h1 className="text-2xl font-semibold text-primary">Signed Out</h1>
                        <p className="text-muted-foreground">You have been successfully signed out.</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-primary mb-2">Sign Out</h1>
                        <p className="text-muted-foreground mb-6">Are you sure you want to sign out?</p>
                        
                        {error && <p className="text-destructive text-sm mb-4">{error}</p>}
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleSignOut}
                                disabled={loading}
                                className="bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg cursor-pointer transition-colors hover:bg-primary/90 disabled:opacity-50"
                            >
                                {loading ? 'Signing out...' : 'Yes, Sign Out'}
                            </button>
                            <button
                                onClick={() => router.back()}
                                disabled={loading}
                                className="border border-input bg-background font-medium py-3 px-4 rounded-lg cursor-pointer transition-colors hover:bg-accent disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Image className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11/12 max-w-lg h-auto opacity-10 z-0" width={366} height={402} alt="background logo" src="/Logo (1).svg" />
        </div>
    );
};

export default SignOut;