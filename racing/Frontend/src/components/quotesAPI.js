import axios from 'axios';
import NodeCache from 'node-cache';
const myCache = new NodeCache({ stdTTL: 7200, checkperiod: 120 });


async function getRandomQuotesByCategory(category) {
  const cacheKey = `${category}:1`; 

  // Try to get data from cache
  const cachedData = myCache.get(cacheKey);
  if (cachedData) {
    console.log('Serving from cache:', cacheKey);
    return cachedData; 
  }

  const options = {
    method: 'GET',
    url: 'https://famous-quotes4.p.rapidapi.com/random',
    params: {
      category: category,
      count: '1'
    },
    headers: {
      'X-RapidAPI-Key': '6bcfd65c97msh2e6416330dd7945p15400cjsnc862f04d5a9b',
      'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
    }
  };

  try {
    // Request data from the Famous Quotes API
    const response = await axios.request(options);
    console.log('Serving from API:', cacheKey);

    if (response.data && response.data.length > 0) {
      // Extract the first quote object from the array
      const quoteObject = response.data[0]; 

      // Save the quote object to cache with TTL
      myCache.set(cacheKey, quoteObject);

      return quoteObject;
    }
  } 
  
  catch (error) {
    console.error(error);
  }
}

export default getRandomQuotesByCategory;

