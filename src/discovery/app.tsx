import { Detail, Color } from "@raycast/api";
import { Release } from "../types/types";
import { useFetch } from "@raycast/utils";


type AppResponse = {
    release: {
        id: string;
        name: string;
        app_name: string;
        version: string;
        latest: boolean;
        author: string;
        icon_url?: string;
        short_description?: string
        released_at: string;
    },
    discovery: {
        title?: string;
        tagline?: string;
        git?: string;
        homepage?: string;
        theme_color: string;
        listed_url: string;
        content?: string;
        stats: {
            total_installs: number;
            release_installs: number;
        }
    }
}

export default function AppPage(props: { release: Release }) {
    const { data, isLoading } = useFetch("https://deta.space/api/v0/discovery/apps/maxs1/webcrate", {
        parseResponse: parseFetchResponse,
    })

    const markdown = `${data?.release.short_description}`; // ![](${data?.release.icon_url}) 

    return (
        <Detail
            isLoading={isLoading}
            navigationTitle={data?.release.app_name}
            markdown={markdown}
            metadata={
                <Detail.Metadata>
                    <Detail.Metadata.Label title="Creator" text={data?.release.author} />
                    <Detail.Metadata.Label title="Version" text={data?.release.version} />
                    <Detail.Metadata.Label title="Date" text={data?.release.released_at} />
                    <Detail.Metadata.TagList title="Type">
                        <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
                    </Detail.Metadata.TagList>
                    <Detail.Metadata.Separator />
                    <Detail.Metadata.Link title="Website" target="https://hello.com" text="Homepage" />
                </Detail.Metadata>
            }
        />
    );
}

async function parseFetchResponse(response: Response): Promise<AppResponse> {
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const payload = (await response.json()) as AppResponse;
    return payload;
}