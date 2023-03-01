import { ActionPanel, Action, Grid, Color, environment } from "@raycast/api";
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

function randomColor() {
  const colors = ["Yellow", "Red", "Purple", "Orange", "Magenta", "Green", "Blue"] as Array<keyof typeof Color>;
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomKey = colors[randomIndex];

  return Color[randomKey];
}

export default function Command() {
  const { data, isLoading } = useSpace<InstancesResponse>("/instances");
  return (
    <Grid isLoading={isLoading}>
      {isLoading ? null : (
        <>
          <StaticCanvasItems />
          {data?.instances.map((instance) => (
            <Grid.Item
              key={instance.id}
              title={instance.release.app_name}
              content={{
                value: instance.release.icon_url ? instance.release.icon_url : { color: randomColor() },

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
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/builder.9b3437f3.webp"
        title="Builder"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/builder" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/collections.9c538cc2.png"
        title="Collections"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/collections" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/docs.36387e5a.webp"
        title="Docs"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/docs" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/manual.a2e80d80.webp"
        title="Manual"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/manual" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/discovery.b6035544.webp"
        title="Discovery"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/discovery" />
          </ActionPanel>
        }
      />
    </>
  );
}
