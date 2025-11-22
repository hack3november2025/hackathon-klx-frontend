import { GeneratedJobOffer, StoredJobOffer } from "@/types";
import { mockDashboardData } from "@/mocks";
import { toast } from "sonner";
import { HandleGeJobOffersType } from "../hooks/handleGeJobOffersType";

const api_0 = process.env.NEXT_PUBLIC_API_URL_0;
const api_2 = process.env.NEXT_PUBLIC_API_URL_2;

export const getJobOffers = async (): Promise<HandleGeJobOffersType> => {
  try {
    const response = await fetch(`${api_2}/offers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    return result as HandleGeJobOffersType;
  } catch (error) {
    toast.error(`Failed to get Job Offers: ${error}`);
    toast.warning(`Mocking Results`);

    return {
      total: mockDashboardData?.active_jobs?.length ?? 0,
      job_offers: mockDashboardData?.active_jobs ?? [],
    } as HandleGeJobOffersType;
  }
};

export const getJobOfferByID = async (_id: string): Promise<StoredJobOffer> => {
  try {
    const response = await fetch(`${api_2}/offers/${_id} `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    return result as StoredJobOffer;
  } catch (error) {
    toast.error(`Failed to get Job Offer: ${error}`);
    toast.warning(`Mocking Results`);

    return mockDashboardData?.active_jobs[0];
  }
};

export const generateJobOffer = async (
  data: any
): Promise<GeneratedJobOffer | null> => {
  try {
    toast("Job Offer request sent... Please wait");

    const response = await fetch(`${api_0}/generate-job-offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    toast.success("Job Offer generated successfully!");

    return result as GeneratedJobOffer;
  } catch (error) {
    toast.error(`Failed to generate Job Offer: ${error}`);
    return null;
  }
};

export const saveJobOffer = async (
  data: GeneratedJobOffer
): Promise<StoredJobOffer | null> => {
  try {
    const response = await fetch(`${api_0}/save-job-offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    toast.success("Job Offer saved successfully!");

    const result = await response.json();

    return result;
  } catch (error) {
    toast.error(`Failed to save Job Offer: ${error}`);
    return null;
  }
};
