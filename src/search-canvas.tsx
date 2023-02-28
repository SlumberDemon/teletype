// Testing

// Re add to package.json

// {
//  "name": "search-canvas",
//  "title": "Search Canvas",
//  "description": "Search installed apps on your canvas",
//  "mode": "view"
// },


import { ActionPanel, Action, Grid } from "@raycast/api";

export default function Command() {
  return (
    <Grid itemSize={Grid.ItemSize.Small}>
      <Grid.Item
        content="https://s3.eu-central-1.amazonaws.com/deta-app-icons.144798365827.eu-central-1/73142659-ff8c-4053-b3e8-ea2909eb4aee/icons/icon"
        title="Filebox"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/discovery/@gyrooo/filebox" />
          </ActionPanel>
        }
      />
    </Grid>
  );
}