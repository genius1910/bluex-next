import MockPricingList from "@/constants/mockup/pricing-list.json";
import { loadCollectionTypes } from "@/lib/strapi_adapter";
import { baseConfig, useMockData } from "./base";
import { Metadata } from "./types";

const query = {
  populate: {
    Title: "*",
    Content: "*",
    Details: {
      populate: {
        title: "*",
        others: "*",
        comment: "*",
        list: "*",
      },
    },
    Note: "*",
    Order: "*",
  },
};

export interface PricingEntry {
  Title: string;
  Content: string;
  Comment: string;
  Order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Note: null | string;
  Details: PricingDetail[];
}

export interface PricingDetail {
  id: number;
  title: string;
  content: null | string;
  comment: null | string;
  others: null | string;
  list: PricingList[];
}

export interface PricingList {
  id: number;
  name: string;
  price: string;
}

export async function fetchAll(locale: string): Promise<PricingEntry[]> {
  if (useMockData) {
    return MockPricingList;
  }

  const fetchByPage = async (page: number): Promise<PricingEntry[]> => {
    const res = await loadCollectionTypes({
      ...baseConfig(),
      collectionName: "pricings",
      locale: locale,
      query,
      page: 1,
      pageSize: 100,
      sort: "Order:asc",
    });
    const meta = res.meta as Metadata;

    if (meta.pagination.pageCount > page) {
      const next = await fetchByPage(page + 1);
      return res.data
        .map((v: any) => v.attributes as PricingEntry)
        .concat(next);
    }

    return res.data.map((v: any) => v.attributes as PricingEntry);
  };

  return await fetchByPage(1);
}
