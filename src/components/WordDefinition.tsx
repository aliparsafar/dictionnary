import React from 'react';

interface WordDefinitionProps {
  wordData: {
    word: string;
    meanings: { definitions: { definition: string }[]; synonyms?: string[] }[];
  };
}

const WordDefinition: React.FC<WordDefinitionProps> = ({ wordData }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{wordData.word}</h2>
      <p className="text-gray-300 mt-2">{wordData.meanings[0]?.definitions[0]?.definition}</p>
      <h3 className="text-lg font-semibold mt-4">Synonyms:</h3>
      <p className="text-gray-400">{wordData.meanings[0]?.synonyms?.join(', ') || 'No synonyms available'}</p>
    </div>
  );
};

export default WordDefinition;
