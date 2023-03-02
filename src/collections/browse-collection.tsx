import { List } from "@raycast/api";
import { useSpace } from "../hooks/use-space";

type Collection = {
  id: string;
  name: string;
  created_at: string;
  migrated?: boolean;
}

type Drive = {
  name: string;
  collection_id: string;
  status: string;
}

type DriveResponse = {
  drives: Drive[]
}


// export default function Collection() {
//   const { data, isLoading } = useSpace<DriveResponse>("/collections/a0gqv419/drives")

//   return (
//     <List.Section>
//       {data?.drives.map((drive) => (
//         <Drive key={drive.collection_id} project={drive} />
//       ))}
//     </List.Section>
//   );
// }


export function CollectionList(props: { collection: Collection }) {
  return (
    <List isShowingDetail navigationTitle={props.collection.name}>
      <List.Section title="Drives">
        <List.Item
          title="Drive Name"
          detail={
            <List.Item.Detail
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label title="Types" />
                  <List.Item.Detail.Metadata.Label title="Grass" icon="pokemon_types/grass.svg" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Poison" icon="pokemon_types/poison.svg" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Chracteristics" />
                  <List.Item.Detail.Metadata.Label title="Height" text="70cm" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Weight" text="6.9 kg" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Abilities" />
                  <List.Item.Detail.Metadata.Label title="Chlorophyll" text="Main Series" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Overgrow" text="Main Series" />
                  <List.Item.Detail.Metadata.Separator />
                </List.Item.Detail.Metadata>
              }
            />
          }
        />
      </List.Section>
      <List.Section title="Bases">
        <List.Item
          title="Base Name"
          detail={
            <List.Item.Detail
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label title="Types" />
                  <List.Item.Detail.Metadata.Label title="Grass" icon="pokemon_types/grass.svg" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Poison" icon="pokemon_types/poison.svg" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Chracteristics" />
                  <List.Item.Detail.Metadata.Label title="Height" text="70cm" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Weight" text="6.9 kg" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Abilities" />
                  <List.Item.Detail.Metadata.Label title="Chlorophyll" text="Main Series" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Overgrow" text="Main Series" />
                  <List.Item.Detail.Metadata.Separator />
                </List.Item.Detail.Metadata>
              }
            />
          }
        />
      </List.Section>
    </List >
  );
}