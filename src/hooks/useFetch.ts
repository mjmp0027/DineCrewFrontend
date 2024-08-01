import Papa from 'papaparse';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Callback = (data: any) => void;

const sanitizeColumns = (data: any) => {
  return data.map((item: any) => {
    const sanitizedItem: any = {};
    Object.keys(item).forEach(key => {
      const sanitizedKey = key.toLowerCase().replace(/(\s|-)+/g, '_');
      sanitizedItem[sanitizedKey] = item[key];
    });
    return sanitizedItem;
  });
};

const useFetch = () => {
  const fetchCsvData = async (url: string, callback: Callback) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const csvString = await response.text();

      const {data} = Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      const sanitizedData = sanitizeColumns(data);

      callback(sanitizedData);
    } catch (error) {
      console.error('Error fetching CSV:', error);
    }
  };
  return {fetchCsvData};
};

export default useFetch;
