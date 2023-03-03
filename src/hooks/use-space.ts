import { useMemo } from "react";
import { SpaceClient } from "deta-space-client";
import { getPreferenceValues } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import type { UseCachedPromiseReturnType } from "@raycast/utils/dist/types";
import type { CachedPromiseOptions } from "@raycast/utils";

const { spaceToken } = getPreferenceValues();

export function useSpace<T, U = undefined>(
  endpoint: string,
  options?: CachedPromiseOptions<(endpoint: string) => Promise<T>, U>
): UseCachedPromiseReturnType<Awaited<T>, U> {
  const client = useMemo(() => SpaceClient(spaceToken), [spaceToken]);

  async function promise(endpoint: string): Promise<T> {
    const res = await client.get(endpoint);
    return res.json();
  }

  return useCachedPromise(promise, [endpoint], options);
}
