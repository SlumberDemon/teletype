import { Action, ActionPanel, Icon, List } from "@raycast/api";
import Revision from "./revisions"
import Build from "./builds";

type Project = {
    id: string;
    name: string;
    status: string;
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
                    title="Builds"
                    icon={Icon.Hammer}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <Build project={props.project} />
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
                    title="Revisions"
                    icon={Icon.List}
                    detail={
                        <List.Item.Detail
                            metadata={
                                <Revision project={props.project} />
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
