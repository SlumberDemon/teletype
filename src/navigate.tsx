import { ActionPanel, Action, Grid } from "@raycast/api";

export default function Command() {
  return (
    <Grid>
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
    </Grid>
  );
}