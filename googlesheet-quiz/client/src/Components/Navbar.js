import React from 'react'

function Navbar() {
    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-800 shadow-lg">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/" className="flex items-center">
                    <img src="./quiz.png" className="mr-1 h-6 sm:h-9" alt="logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">GoogleSheetQuiz</span>
                </a>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
                </div>
            </div>
        </nav>
    )
}

export default Navbar
