import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import qs from 'qs';

interface LoaderConfig {
  apiURL: string;
  accessToken: string;
}

//  const axiosInstance = createAxiosInstance(strapiConfig);

const createAxiosInstance = (strapiConfig: LoaderConfig) => {
  const {
    accessToken,
    apiURL,
  } = strapiConfig;

  const headers = {} as AxiosHeaders;
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  const instance = axios.create({
    baseURL: apiURL,
    headers,
  });

  return instance;
};

interface loadSingleTypesRequest {
  axiosInstance: AxiosInstance
  singularName: string
  query: any
  locales: string[]
  limit: number
}

const loadSingleTypes = async ({ axiosInstance, singularName, locales, query, limit }: loadSingleTypesRequest) => {
  const endpoint = `/api/${singularName}`
  const queryParams = {
    ...query,
    pagination: {
      pageSize: limit || 250,
      page: 1,
    },
    populate: query?.populate || "*",
  }

  try {
    // Fetch localizations of this entry if there are any
    const localizationsPromises = locales.map(async (locale) => {
      const options = {
        method: "GET",
        url: endpoint,
        params: { ...queryParams, locale },
        // Source: https://github.com/axios/axios/issues/5058#issuecomment-1379970592
        paramsSerializer: {
          serialize: (parameters: any) => qs.stringify(parameters, { encodeValuesOnly: true }),
        },
      };

      const { data: { data } } = await axiosInstance(options);

      return { data, locale };
    });

    // Run queries in parallel
    const localizationsData = await Promise.all(localizationsPromises);

    return localizationsData.reduce((acc, entry) => ({ ...acc, [entry.locale]: entry.data }), {})

  } catch (error: any) {
    if (error?.response?.status !== 404) {
      throw new Error(`Failed to fetch data from Strapi for ${singularName}, error: ${error}`);
    }
    return [];
  }
}

export { loadSingleTypes, createAxiosInstance }
