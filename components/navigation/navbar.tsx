import React from "react";
import { Tabs } from '@mantine/core';
import { IconPhoto, IconSettings } from '@tabler/icons-react';
import  useStyles  from './navBar.style'


export function NavyBar() {
    const { classes } = useStyles();
    return (
        <Tabs className={classes.NavStyles}>
            <Tabs.List>
                <Tabs.Tab value="home" icon={<IconPhoto size="0.8rem"/>}>Home</Tabs.Tab>
            </Tabs.List>
        </Tabs>
    );
}