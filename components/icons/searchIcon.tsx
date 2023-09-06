import { ActionIcon } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

export const Searchiconright = ({ ...rest }) => {
    return (
        <ActionIcon color="violet" size="xl" radius="xl" { ...rest } variant="filled">
            <IconArrowRight size="2.125rem" />
        </ActionIcon>
    );
}
