import { useEffect, useMemo, useState } from "react";
import DetaSpaceClient from "deta-space-client";
import { getPreferenceValues } from "@raycast/api";

const { spaceToken } = getPreferenceValues();

export function useSpace<T>(endpoint: string): { data?: T; isLoading: boolean } {
  const [data, setData] = useState<T>();
  const client = useMemo(() => DetaSpaceClient(spaceToken), [spaceToken]);
  useEffect(() => {
    client
      .get(endpoint)
      .then((res) => res.json())
      .then(setData);
  }, []);

  return { data, isLoading: typeof data === "undefined" };
}
