
import { Activity } from 'lucide-react';
import { useStore } from '../store/useStore';

export const WhoopConnect = () => {
  const { whoopConnection, setWhoopConnection } = useStore();

  const handleDisconnect = async () => {
    setWhoopConnection(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="w-8 h-8 text-[#2d8059]" />
          <div>
            <h2 className="text-lg font-semibold">Whoop Connection <span className="text-sm font-normal text-gray-500">(coming soon)</span></h2>
            <p className="text-sm text-gray-600">
              {whoopConnection
                ? 'Connected to Whoop'
                : 'Connect your Whoop account to get personalized insights'}
            </p>
          </div>
        </div>
        <button
          onClick={whoopConnection ? handleDisconnect : undefined}
          disabled={!whoopConnection}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            whoopConnection
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {whoopConnection ? 'Disconnect' : 'Coming Soon'}
        </button>
      </div>
    </div>
  );
};