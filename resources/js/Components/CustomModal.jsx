import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function CustomModal({children, onModalOpen, open}) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 
    console.log(isMobile);
    
    return (
        <>
            {open && (
                <div className="fixed inset-0 flex items-center justify-end z-50">
                    <div className="bg-black opacity-50 absolute right-0 inset-0" onClick={() => onModalOpen(false)}></div>
                
                    <div className={`${isMobile ? 'w-full h-full' : 'w-1/3 h-[80vh] mr-10'} bg-white rounded-lg shadow-lg p-6 transition-transform transform`}>
                        <button  onClick={() => onModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}