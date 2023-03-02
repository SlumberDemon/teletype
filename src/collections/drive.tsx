import { useSpace } from "../hooks/use-space";
import { List } from "@raycast/api";

type DriveInfo = {
    size: number;
    last: string;
};

type DriveDataResponse = {
    paging: DriveInfo;
    names: string[];
};

export default function DriveData() {
    // const { data } = useSpace<DriveDataResponse>("/drive/v1/a0gqv419/files/files?prefix=/&recursive=false&limit=22&last=")

    return (
        < List.Item.Detail
            metadata={
                < List.Item.Detail.Metadata >
                    <List.Item.Detail.Metadata.Label title="Results 22" />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label title="File.ext" />
                </List.Item.Detail.Metadata >
            }
        />
    )
}