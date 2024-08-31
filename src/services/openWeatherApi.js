import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const openWeatherApiHeaders = {
  'x-rapidapi-key': 'ff5d7c7e18msh786dea9999c2618p1b08a2jsn38d7d455ea67',
  'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
};

const baseUrl = 'https://open-weather13.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: openWeatherApiHeaders });

export const openWeatherApi = createApi({
  reducerPath: 'openWeatherApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (city) => createRequest(`/city/${city}/EN`),
    }),
  }),
});

export const { useGetWeatherQuery } = openWeatherApi;
