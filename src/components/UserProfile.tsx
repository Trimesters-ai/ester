import React, { useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const UserProfile = () => {
  const { user, setUser } = useStore();
  const [apiKeyInput, setApiKeyInput] = useState(user?.openaiApiKey ? '********' : '');
  const [editMode, setEditMode] = useState(!user?.openaiApiKey);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyInput(e.target.value);
    setSaved(false);
  };

  const handleApiKeySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput || apiKeyInput === '********') return;
    setUser({ ...user, openaiApiKey: apiKeyInput });
    setEditMode(false);
    setSaved(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setApiKeyInput('');
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <User className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-lg font-semibold">{user.name || <span className="text-gray-400 italic">(not set)</span>}</h2>
            <p className="text-sm text-gray-600">
              {user.postpartumDate
                ? (() => {
                    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const friendlyDate = formatInTimeZone(new Date(user.postpartumDate), userTimezone, "MMMM d, yyyy");
                    const tzAbbr = new Date(user.postpartumDate).toLocaleTimeString(undefined, { timeZone: userTimezone, timeZoneName: 'short' }).split(' ').pop();
                    return `Postpartum since: ${friendlyDate}${tzAbbr ? ` (${tzAbbr})` : ''}`;
                  })()
                : <span className="text-gray-400 italic">Postpartum date not set</span>}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-md font-semibold mb-2">OpenAI API Key</h3>
        {editMode ? (
          <form onSubmit={handleApiKeySave} className="flex items-center space-x-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={handleApiKeyChange}
              placeholder="Enter your OpenAI API key"
              className="border rounded px-3 py-2 text-sm w-64"
              autoFocus
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm"
              disabled={!apiKeyInput || apiKeyInput === '********'}
            >
              Save
            </button>
          </form>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="password"
              value={user.openaiApiKey ? '********' : ''}
              readOnly
              className="border rounded px-3 py-2 text-sm w-64 bg-gray-100 cursor-not-allowed"
              tabIndex={-1}
            />
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-colors text-sm"
              onClick={handleEditClick}
            >
              {user.openaiApiKey ? 'Update' : 'Add'}
            </button>
            {saved && <span className="text-green-600 text-sm ml-2">Saved!</span>}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Your API key is stored only in your browser and used for your chat sessions. <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="underline">Get your key</a>.
        </p>
      </div>
    </div>
  );
};