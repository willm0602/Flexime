'use client';

/**
 * Uses search parameters to determine if an error should be displayed.
 */

import { useSearchParams } from 'next/navigation';

export default function ErrorBanner() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <>
            {error && (
                <div className='alert alert-error shadow-lg mb-8'>
                    <div>
                        <span>{error}</span>
                    </div>
                </div>
            )}
        </>
    );
}
