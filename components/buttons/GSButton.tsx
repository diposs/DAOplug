import { Button} from "@mantine/core";
export const GsButton = ({ ...rest }) =>  {
    return (
        <Button radius="xl" h={40}  { ...rest }>GetStarted</Button>
    );
}
export const GsLogoutButton = ({ ...rest }) =>  {
    return (
        <Button radius="md" h={40}  { ...rest }>LogOut</Button>
    );
}
