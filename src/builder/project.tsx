import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useSpace } from "../hooks/use-space";

type Project = {
    id: string;
    name: string;
    status: string;
}

type Build = {
    id: string;
    tag: string;
    app_id: string;
    status: string;
    created_at: string;
    updated_at: string;
}

type BuildsResponse = {
    builds: Build[]
}

export default function OpenProject(props: { project: Project, }) {
    // const { data, isLoading } = useSpace

    return (
        <List isShowingDetail navigationTitle={props.project.name}>
            <List.Item
                title="Main" // gets data from https://deta.space/api/v0/instances/smallidhere (id example: a05P5Ar14hts)
                icon={Icon.House}
                detail={
                    <List.Item.Detail
                        metadata={
                            <List.Item.Detail.Metadata>

                            </List.Item.Detail.Metadata>
                        }
                    />
                }
            />
            <List.Section title="Development">
                <List.Item
                    title="Builds" // https://deta.space/api/v0/builds?app_id=
                    icon={Icon.Hammer}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <List.Item.Detail.Metadata>

                                </List.Item.Detail.Metadata>
                            }
                        />
                    }
                />
                <List.Item
                    title="Micros" // https://deta.space/api/v0/instances/smallidhere 
                    icon={Icon.ComputerChip}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <List.Item.Detail.Metadata>

                                </List.Item.Detail.Metadata>
                            }
                        />
                    }
                />
                <List.Item
                    title="Revisions" // https://deta.space/api/v0/apps/appidhere/revisions
                    icon={Icon.List}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <List.Item.Detail.Metadata>

                                </List.Item.Detail.Metadata>
                            }
                        />
                    }
                />
                <List.Item
                    title="Actions" // https://deta.space/api/v0/instances/smallidhere/actions
                    icon={Icon.Clock}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <List.Item.Detail.Metadata>

                                </List.Item.Detail.Metadata>
                            }
                        />
                    }
                />
            </List.Section>
            <List.Section title="Data">
                <List.Item
                    title="Bases"
                    icon={Icon.List}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <Build project={props.project} />
                            }
                        />
                    }
                    actions={
                        // Browse base -> connect to file-navigation feature
                        <ActionPanel>
                            <Action.Push icon={Icon.AppWindowList} title="Browse Bases" target={null} />
                        </ActionPanel>
                    }
                />
                <List.Item
                    title="Drives"
                    icon={Icon.HardDrive}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <List.Item.Detail.Metadata>

                                </List.Item.Detail.Metadata>
                            }
                        />
                    }
                    actions={
                        // Browse drives -> connect to file-navigation feature
                        <ActionPanel>
                            <Action.Push icon={Icon.AppWindowList} title="Browse Drives" target={null} />
                        </ActionPanel>
                    }
                />
            </List.Section>
        </List>
    );
}

function Build(props: { project: Project }) {
    const { data } = useSpace<BuildsResponse>(`/builds?app_id=${props.project.id}`)

    return <List.Item.Detail.Metadata>
        {data?.builds.map((build) =>
            <List.Item.Detail.Metadata.Label title={build.id} text={build.status} />
        )}
    </List.Item.Detail.Metadata>
}
