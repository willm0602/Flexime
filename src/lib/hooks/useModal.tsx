'use client';

import type React from 'react';
import { createContext, type ReactElement, useContext, useState } from 'react';

interface ModalContextData {
    modal?: React.ReactNode;
    setModal?: (modal: React.ReactNode | undefined) => unknown;
    setIsOpen?: (isOpen: boolean) => unknown;
}

const ModalContext = createContext<ModalContextData>({});

export function useModal() {
    const [modal, setModal] = useState<React.ReactNode | undefined>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const defaultContext: ModalContextData = {
        modal,
        setModal,
        setIsOpen,
    };

    const ModalContainer = ({ children }: { children: ReactElement }) => {
        <ModalContext.Provider value={defaultContext}>
            <dialog open={isOpen}>{modal}</dialog>
            {children}
        </ModalContext.Provider>;
    };
    return {
        ...useContext(ModalContext),
        ModalContainer,
    };
}
