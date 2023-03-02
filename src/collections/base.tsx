// import { useSpace } from "../hooks/use-space";
import { Icon, List } from "@raycast/api";

type Base = {
    name: string;
    collection_id: string;
    status: string;
}

export default function BaseSearch(props: { base: Base }) {
    // const { data } = useSpace<DriveDataResponse>("/drive/v1/a0gqv419/files/files?prefix=/&recursive=false&limit=22&last=")

    return (
        <List isShowingDetail navigationTitle={props.base.name}>
            <List.Item
                title="Item"
                detail={
                    <List.Item.Detail
                        markdown="
                        {'data': [
                            '1': 'hello',
                            '2': 'world
                        ]}
                        "
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