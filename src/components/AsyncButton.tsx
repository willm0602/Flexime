/**
 * Generic button that can be used for executing promises,
 * and using a status indicator to notify the user if it was updated
 * properly
 */

import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import type React from 'react';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

// TODO: possibly abstract this to a prop, likely unnecessary though
const TIMEOUT_TIME = 3000;

type AsyncButtonProps<T> = React.HTMLProps<HTMLButtonElement> & {
    promise: () => Promise<T>;
    onSuccess?: CallableFunction;
    onError?: CallableFunction;
};

type AsyncButtonStatus = 'IDLE' | 'RUNNING' | 'PASSED' | 'FAILED';

export default function AsyncButton<T>(props: AsyncButtonProps<T>) {
    const { children, promise, onSuccess, onError, ...buttonProps } = props;
    const [status, setStatus] = useState<AsyncButtonStatus>('IDLE');

    return (
        <button
            {...buttonProps}
            type='button'
            onClick={() => {
                setStatus('RUNNING');
                promise()
                    .then((resp) => {
                        onSuccess?.(resp);
                        setStatus('PASSED');
                    })
                    .catch((rej) => {
                        onError?.(rej);
                        setStatus('FAILED');
                    })
                    .finally(() => {
                        setTimeout(() => {
                            setStatus('IDLE');
                        }, TIMEOUT_TIME);
                    });
            }}
        >
            {status === 'IDLE' ? (
                children
            ) : status === 'RUNNING' ? (
                <LoadingSpinner className='w-12 h-12' />
            ) : status === 'PASSED' ? (
                <CheckBadgeIcon width={24} height={24} />
            ) : (
                <XMarkIcon width={24} height={24} />
            )}
        </button>
    );
}
