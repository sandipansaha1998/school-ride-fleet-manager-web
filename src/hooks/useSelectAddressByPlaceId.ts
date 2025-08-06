import { getLocationByPlaceId } from "@/api/services.ts/maps";
import { Address } from "@/types/entities";
import { useState, useEffect, useCallback } from "react";

const useSelectAddressByPlaceId = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const selectPlace = async (placeId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getLocationByPlaceId(placeId!);
      setSelectedAddress(response);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setSelectedAddress(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedAddress,
    loading,
    error,
    selectPlace,
  };
};

export default useSelectAddressByPlaceId;
