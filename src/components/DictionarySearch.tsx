import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import WordDefinition from './WordDefinition';
import ImageDisplay from './ImageDisplay';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; 

const DictionarySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');

  const { data: wordData, isLoading: wordLoading, isError: wordError } = useQuery({
    queryKey: query ? ['word', query] : [],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}${query}`);
      return response.data[0];
    },
    enabled: !!query,
  });

  const { data: imageData, isError: imageError } = useQuery({
    queryKey: query ? ['image', query] : [],
    queryFn: async () => {
      const response = await axios.get(`${UNSPLASH_URL}?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
      console.log("Unsplash API Response:", response.data); 
      return response.data.results.length > 0 
        ? response.data.results[0].urls.small 
        : "https://via.placeholder.com/150"; 
    },
    enabled: !!query,
  });

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setQuery(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter a word..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>

      {wordLoading && <p className="text-gray-400">Loading...</p>}
      {wordError && <p className="text-red-500">Error fetching word data.</p>}
      {wordData && <WordDefinition wordData={wordData} />}

      {imageError && <p className="text-red-500 mt-4">Error fetching image.</p>}
      {imageData && <ImageDisplay imageUrl={imageData} />}
    </div>
  );
};

export default DictionarySearch;

