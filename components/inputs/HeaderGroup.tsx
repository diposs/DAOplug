import {Group,Anchor } from '@mantine/core';
import { Texto } from '../Text/HeaderText';

export function HeadGroup() {
return (
    <Anchor href='/' sx={{ '&:hover': { textDecoration: 'none', },}} >
    <Group spacing="xs">
        <Texto/>
    </Group>
    </Anchor>
);
}

