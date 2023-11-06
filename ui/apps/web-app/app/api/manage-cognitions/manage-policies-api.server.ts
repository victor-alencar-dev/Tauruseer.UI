import { http } from '@tauruseer/api';

export const getCognitionsList = async () => {
  return await http.get('cognitions');
};

export const setCognitionsPreference = async (id: string, isActive: string | null) => {
  const { data } = await http.put(
    `cognitions/update-preference`,
    JSON.stringify({ insightTypeId: Number(id), isActive }),
  );
  return data;
};
