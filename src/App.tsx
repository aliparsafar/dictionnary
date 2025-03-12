import './App.css';
import Dictionary from './components/DictionarySearch';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Visual Dictionary</h1>
      <Dictionary />
    </div>
  );
};

export default App;
