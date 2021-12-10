import React from 'react';

const BroilerItemForm = ({ type, placeholder, ariaLabel, buttonText}) => {
    return (
        <>
            <form class="w-full max-w-sm">
                <div class="flex items-center border-b border-green-500 py-2">
                    <input
                        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type={type}
                        placeholder={placeholder}
                        aria-label={ariaLabel}
                    />
                    <button
                        class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-teal-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                    >
                        {buttonText}
                    </button>
                </div>
            </form>
        </>
    );
}

export default BroilerItemForm
