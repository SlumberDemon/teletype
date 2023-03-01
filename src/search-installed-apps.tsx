import { ActionPanel, Action, Grid, environment, Icon } from "@raycast/api";
import SearchDiscovery from "./open-discovery";
import SearchDocs from "./search-docs";
import SearchProjects from "./search-projects";
import { useSpace } from "./hooks";

type Instance = {
  id: string;
  release: {
    app_name: string;
    icon_url?: string;
    short_description?: string;
  };
  url: string;
};

type InstancesResponse = {
  instances: Instance[];
};

export default function Command() {
  const { data, isLoading } = useSpace<InstancesResponse>("/instances");
  return (
    <Grid isLoading={isLoading} itemSize={Grid.ItemSize.Small} navigationTitle="Canvas">
      {isLoading ? null : (
        <>
          <StaticCanvasItems />
          <Docs />
          <Builder />
          <Discovery />
          {data?.instances.map((instance) => (
            <Grid.Item
              key={instance.id}
              title={instance.release.app_name}
              content={{
                value: instance.release.icon_url ? instance.release.icon_url : { color: "#ED3FA2" },

                tooltip: instance.release.short_description || "No description",
              }}
              actions={
                <ActionPanel>
                  <Action.OpenInBrowser url={instance.url} />
                  {environment.isDevelopment ? <Action.CopyToClipboard content={JSON.stringify(instance)} /> : null}
                </ActionPanel>
              }
            />
          ))}
        </>
      )}
    </Grid>
  );
}

function StaticCanvasItems() {
  return (
    <>
      <Grid.Item
        content="https://deta.space/assets/legacy_cloud.43f2c117.webp"
        title="Legacy Cloud"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/legacy" />
            <Action.CopyToClipboard content="https://deta.space/legacy" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/collections.9c538cc2.png"
        title="Collections"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/collections" />
            <Action.CopyToClipboard content="https://deta.space/collections" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/manual.a2e80d80.webp"
        title="Manual"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/manual" />
            <Action.CopyToClipboard content="https://deta.space/manual" />
          </ActionPanel>
        }
      />
    </>
  );
}

function Discovery() {
  return (
    <Grid.Item
      content="https://deta.space/assets/discovery.b6035544.webp"
      title="Discovery"
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.AppWindowList} title="Search Discovery" target={<SearchDiscovery />} />
          <Action.OpenInBrowser url="https://deta.space/discovery" />
        </ActionPanel>
      }
    />
  );
}

function Builder() {
  return (
    <Grid.Item
      content="https://deta.space/assets/builder.9b3437f3.webp"
      title="Builder"
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.AppWindowList} title="Search Builder" target={<SearchProjects />} />
          <Action.OpenInBrowser url="https://deta.space/builder" />
        </ActionPanel>
      }
    />
  );
}

function Docs() {
  return (
    <Grid.Item
      content="https://deta.space/assets/docs.36387e5a.webp"
      title="Docs"
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.AppWindowList} title="Search Docs" target={<SearchDocs />} />
          <Action.OpenInBrowser url="https://deta.space/docs" />
        </ActionPanel>
      }
    />
  );
}
