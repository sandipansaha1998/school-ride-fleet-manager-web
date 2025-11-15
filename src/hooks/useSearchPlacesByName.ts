import { getPlacesByName } from "@/api/services/maps";
import { PlacePrediction } from "@/types/maps";
import { useEffect, useRef, useState } from "react";

// http://localhost:8080/api/v1/maps/search/places?input=delhi&key=YOUR_API_KEY%22
export const useSearchPlacesByName = () => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateSearchText = (text: string | undefined) => {
    setSearchText(text);
    if (text === undefined) {
      return;
    }
    if (text.trim() === "") {
      return;
    }
    setLoading(true);
  };
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (searchText === undefined) {
        setLoading(false);
        setSearchResults([]);
        return;
      }
      if (searchText!.trim() === "") {
        setLoading(false);
        setSearchResults([]);
        return;
      }
      try {
        setLoading(true);
        let placePredictions = await getPlacesByName(searchText!);
        setSearchResults(placePredictions);
      } finally {
        setLoading(false);
      }
    }, 700);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchText]);

  return { updateSearchText, searchText, searchResults, loading };
};
