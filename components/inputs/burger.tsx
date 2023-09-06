import { ActionIcon } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import useStyles from '../style/container.style'



export const Burgy = ({ ...rest }) => {
    const { classes } = useStyles();
return  (
    <ActionIcon color="violet" size="lg" radius="md" variant="transparent" className={classes.nonMobile} { ...rest } >
        <IconMenu2 size="1.625rem" />
    </ActionIcon>
);
}
