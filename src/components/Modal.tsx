import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, title, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
        <button
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
