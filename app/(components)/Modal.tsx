'use client';
import React, { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

export const useModal = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        // ReactModal.setAppElement('#modal-root');
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setModalOpen(true);
    }, []);

    return {
        modalOpen,
        closeModal,
        openModal
    };
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const Modal: React.FC<{ isOpen: boolean; children: React.ReactNode }> = ({ isOpen, children }) => {
    return (
        <ReactModal isOpen={isOpen} style={customStyles}>
            {children}
        </ReactModal>
    );
};
