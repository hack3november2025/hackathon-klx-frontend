import { GeneratedJobOffer, StoredJobOffer } from "@/types";
import { mockDashboardData } from "@/mocks";
import { toast } from "sonner";

const api = process.env.NEXT_PUBLIC_API_URL;

export const getJobOffers = async (): Promise<StoredJobOffer[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1300));

  try {
    const response = await fetch("/mocks/mockeListOfJobOffers.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: StoredJobOffer[] = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch Job Offers, falling back to mocks:", error);

    return mockDashboardData?.active_jobs ?? [];
  }
};

export const generateJobOffer = async (
  data: any
): Promise<GeneratedJobOffer | null> => {
  try {
    toast("Job Offer request sent... Please wait");

    const response = await fetch(`${api}/generate-job-offer`, {
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
    const response = await fetch(`${api}/save-job-offer`, {
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
