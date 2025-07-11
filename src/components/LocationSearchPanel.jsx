import React from 'react'

const LocationSearchPanel = ({
  suggestions = [],
  onSelectSuggestion,
  
}) => {
  
  return (
    <div>
      {suggestions.length === 0 && (
        <div className=" text-gray-400 text-center py-14">No suggestions found</div>
      )}
      {suggestions.map((elem, idx) => (
        <div
          key={elem.place_id || idx}
          onClick={() => {
            onSelectSuggestion(elem.description || elem);
          }}
          className='flex gap-4 border-gray-100 active:border-black border-2 p-2 rounded-xl items-center my-2 justify-start cursor-pointer'
        >
          <h2 className='bg-white h-8 w-12 flex items-center justify-center rounded-full'>
            <i className='ri-map-pin-fill'/>
          </h2>
          <h4 className='font-medium'>{elem.description || elem}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel