import { ActionPanel, Action, List, Icon, Image } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function SearchDiscovery() {
  const { data, isLoading } = useFetch(
    "https://deta.space/api/v0/discovery/apps",
    {
      parseResponse: parseFetchResponse,
    }
  );

  return (
    <List
      isLoading={isLoading}
      navigationTitle="Discovery"
      searchBarPlaceholder="Search..."
    >
      <List.Section title="Results" subtitle={data?.length + ""}>
        {data?.map((release) => (
          <Release key={release.app_id} release={release} />
        ))}
      </List.Section>
    </List>
  );
}

function Release({ release }: { release: Release }) {
  return (
    <List.Item
      title={release.discovery.title}
      subtitle={release.discovery.tagline}
      icon={release.icon_url ? { source: release.icon_url, mask: Image.Mask.RoundedRectangle } : Icon.Dot}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser title="Open in Browser" url={release.discovery.listed_url} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard
              title="Copy Url"
              content={`${release.discovery.listed_url}`}
              shortcut={{ modifiers: ["cmd"], key: "." }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

type Release = {
  app_id: string;
  version: string;
  icon_url?: string;
  discovery: {
    title: string;
    tagline: string;
    theme_color: string;
    git?: string;
    homepage?: string;
    listed_url: string;
    stats: {
      total_installs: number;
    }
  }
}

type DiscoveryResponse = {
  releases: Release[]
}

async function parseFetchResponse(response: Response): Promise<Release[]> {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const payload = await response.json() as DiscoveryResponse;

  return payload.releases.filter((release) => release.discovery.title != "").sort((a, b) => b.discovery.stats.total_installs - a.discovery.stats.total_installs);
}
