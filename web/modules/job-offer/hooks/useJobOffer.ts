"use client";

import { GeneratedJobOffer, JobOfferRequest, StoredJobOffer } from "@/types";
import { useCallback, useState } from "react";

import { toast } from "sonner";
import {
  generateJobOffer,
  getJobOffers,
  saveJobOffer,
} from "../services/job-offer-service";
import { HandleGeJobOffersType } from "./handleGeJobOffersType";

type Handler<T, R = void> = {
  props: T;
  onSuccess?: (response?: R) => void;
  onError?: (error: Error) => void;
};

interface Properties {
  loading: boolean;
  totalJobOffers: number;
  jobOffers: StoredJobOffer[];
}

const JOB_OFFERS_STORAGE_KEY = "job-offers-list";

export const useJobOffer = () => {
  const [properties, setProperties] = useState<Properties>({
    loading: false,
    totalJobOffers: 0,
    jobOffers: [],
  });

  const handleSetProperties = useCallback(
    (newProperties: Partial<Properties>) => {
      setProperties((prev) => ({ ...prev, ...newProperties }));
    },
    []
  );

  const handleGeJobOffers = useCallback(
    async (
      { onSuccess, onError }: Handler<{}, HandleGeJobOffersType> = {
        props: {},
      }
    ) => {
      handleSetProperties({ loading: true });

      try {
        const data = await getJobOffers();

        handleSetProperties({ jobOffers: data.job_offers });
        handleSetProperties({ totalJobOffers: data.total });

        if (onSuccess) {
          onSuccess(data);
          toast(`Job Offers successfully fetched`);

          return data;
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);

          return;
        }

        toast.error(`Error listing Job Offers: ${error}`);
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    []
  );

  const handleGenerateJobOffer = useCallback(
    async ({
      props,
      onSuccess,
      onError,
    }: Handler<
      JobOfferRequest,
      GeneratedJobOffer
    >): Promise<GeneratedJobOffer | void> => {
      handleSetProperties({ loading: true });

      try {
        const result = await generateJobOffer(props);

        if (!result) {
          throw new Error("Failed to generate job offer");
        }

        const generated: GeneratedJobOffer =
          typeof result === "object" && result !== null && "job_offer" in result
            ? (result as any).job_offer
            : (result as GeneratedJobOffer);

        if (onSuccess) {
          onSuccess(generated);
        }

        await handleGeJobOffers();

        return generated;
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }

        toast.error("Error generating Job Offer");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [handleGeJobOffers, handleSetProperties]
  );

  const handleSaveJobOffer = useCallback(
    async ({
      props,
      onSuccess,
      onError,
    }: Handler<GeneratedJobOffer, StoredJobOffer>): Promise<
      StoredJobOffer | undefined
    > => {
      handleSetProperties({ loading: true });

      try {
        const result = await saveJobOffer(props);

        if (!result) {
          throw new Error("Failed to save job offer");
        }

        if (onSuccess) {
          onSuccess(result);
        }

        const data = await handleGeJobOffers();
        handleSetProperties({ jobOffers: data?.job_offers });
        handleSetProperties({ totalJobOffers: data?.total });

        return result;
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }

        toast.error("Error creating Job Offer");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [handleGeJobOffers, handleSetProperties]
  );

  return {
    jobOffers: properties.jobOffers,
    loading: properties.loading,
    handleGeJobOffers,
    handleGenerateJobOffer,
    handleSaveJobOffer,
  };
};
