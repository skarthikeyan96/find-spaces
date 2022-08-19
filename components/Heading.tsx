import React from 'react'

const Heading = () => {
    return (
        <div className="flex flex-col pr-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text mr-4">
          Find Spaces
        </h1>

        <p className="text-gray-600  mb-16 mt-4">
          Search the twitter space for your interests. You can also search for
          people and topics. You can also search for spaces by category.
        </p>
      </div>
    )
}

export default Heading;