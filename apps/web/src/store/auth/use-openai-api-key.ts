import useLocalStorageState from 'use-local-storage-state';

export const useOpenaiApiKey = () => {
  const [apiKey, setApiKey, { removeItem }] = useLocalStorageState<string>('openai-api-key', {
    storageSync: true,
  });
  return { apiKey, setApiKey, removeApiKey: removeItem };
};
