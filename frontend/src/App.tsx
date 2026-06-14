import React, { useState } from 'react';
import Header from './components/layout/Header';
import AssessmentView from './views/AssessmentView';
import RegretPredictorView from './views/RegretPredictorView';

type View = 'assessment' | 'regret';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('assessment');
  const [points, setPoints] = useState(500);

  const handleAddPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  return (
    <div className="min-h-screen bg-amazon-bg flex flex-col">
      <Header points={points} />
      
      {/* Navigation for Demo */}
      <div className="bg-white border-b border-amazon-border px-6 py-2 flex gap-6 text-sm">
        <button 
          onClick={() => setCurrentView('assessment')}
          className={`pb-1 border-b-2 transition-colors ${currentView === 'assessment' ? 'border-amazon-orange text-amazon-orange font-bold' : 'border-transparent text-amazon-muted hover:text-amazon-orange'}`}
        >
          Product Assessment
        </button>
        <button 
          onClick={() => setCurrentView('regret')}
          className={`pb-1 border-b-2 transition-colors ${currentView === 'regret' ? 'border-amazon-orange text-amazon-orange font-bold' : 'border-transparent text-amazon-muted hover:text-amazon-orange'}`}
        >
          Return Regret Predictor
        </button>
      </div>

      <main className="flex-1">
        {currentView === 'assessment' ? (
          <AssessmentView onAddPoints={handleAddPoints} />
        ) : (
          <RegretPredictorView />
        )}
      </main>

      <footer className="bg-amazon-light text-white p-10 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Get to Know Us</h4>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">About SecondLife</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Sustainability Commitment</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Press Releases</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Connect with Us</h4>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Facebook</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Twitter</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Instagram</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Circular Services</h4>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Sell on SecondLife</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Refurbishment Partners</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Donation Fulfillment</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Let Us Help You</h4>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">COVID-19 and SecondLife</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Your Account</span>
            <span className="text-sm text-gray-300 hover:underline cursor-pointer">Help</span>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-10 text-center text-xs text-gray-400">
          <p>© 2026 SecondLife Commerce. An Amazon Build On Hackathon Entry.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
