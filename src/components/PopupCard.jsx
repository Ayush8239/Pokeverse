import React from 'react';

const PopupCard = ({ pokemon, onClose }) => {
  return (
    <div className="popup-card fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <h1>hell</h1>
        <div className="card bg-white rounded-lg p-4 shadow-md"> 
        <img className="w-48 h-48 mx-auto mb-4" src={pokemon?.sprites?.other?.dream_world?.front_default} alt={pokemon.name} />
        <h2 className="text-2xl font-bold text-center mb-2">{pokemon.name}</h2>
        <div className="details mb-4">
           {/* <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p> */}
          <p>Height: {pokemon.height} cm</p>
          <p>Weight: {pokemon.weight} hg</p>
        </div> 
        <button className="close-button bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupCard;
