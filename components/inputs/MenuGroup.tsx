import {Group, Menu, Center} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import {items} from '../menu/menucontent';
import useStyles from '../style/MenuCss.style';

export function MenuGroup() {
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const itemed = items.map((link) => {
        const menuItems = link.links?.map((item) => (
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));
    
        if (menuItems) {
        return (
            <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }}>
            <Menu.Target>
                <a
                href={link.link}
                className={classes.link}>
                <Center>
                    <span className={classes.linkLabel}>{link.label}</span>
                    <IconChevronDown size="12px" stroke={1.5} />
                </Center>
                </a>
            </Menu.Target>
            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
        );
        }
    
        return (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}>
            {link.label}
        </a>
        );
    });
return (
    <Group spacing="xs" className={classes.links} >
      {itemed} 
    </Group>
);
}
