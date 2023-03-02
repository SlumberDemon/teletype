// import { useSpace } from "../hooks/use-space";
import { Icon, List } from "@raycast/api";

type Drive = {
    name: string;
    collection_id: string;
    status: string;
}

// type DriveInfo = {
//    size: number;
//    last: string;
// };

// type DriveDataResponse = {
//    paging: DriveInfo;
//    names: string[];
// };

export default function DriveSearch(props: { drive: Drive }) {
    // const { data } = useSpace<DriveDataResponse>("/drive/v1/a0gqv419/files/files?prefix=/&recursive=false&limit=22&last=")

    return (
        <List isShowingDetail navigationTitle={props.drive.name}>
            <List.Item
                title="file.ext"
                detail={
                    <List.Item.Detail
                        markdown="![Illustration](https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png)"
                        metadata={
                            <List.Item.Detail.Metadata>
                                <List.Item.Detail.Metadata.Label title="Data" />
                                <List.Item.Detail.Metadata.Label title="Info" icon={Icon.Info} />
                                <List.Item.Detail.Metadata.Separator />
                            </List.Item.Detail.Metadata>
                        }
                    />
                }
            />
        </List>
    );
}