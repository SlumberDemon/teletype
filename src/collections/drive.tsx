import { useSpace } from "../hooks/use-space";

type Info = {
    size: number;
    last: string;
};

type DriveResponse = {
    paging: Info;
    names: string[];
};

export default function BrowseDrive() {
    const { data, isloading } = useSpace<DriveResponse>("/drive/v1/a0gqv419/files/files?prefix=/&recursive=false&limit=22&last=")
}