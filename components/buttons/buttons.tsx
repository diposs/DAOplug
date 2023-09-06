import { Button } from '@mantine/core';

export function NavButton() {
    return(
        <Button.Group>
            <Button variant="subtle" radius="md" size="md" compact>PlaceHolder</Button>
            <Button variant="subtle" radius="md" size="md" compact>PlaceHolder</Button>
            <Button variant="subtle" radius="md" size="md" compact>PlaceHolder</Button>
            <Button variant="subtle" radius="md" size="md" compact>PlaceHolder</Button>
            <Button variant="subtle" radius="md" size="md" compact>PlaceHolder</Button>
            <Button variant="subtle" radius="md" size="md" compact>PlaceHolder</Button>
        </Button.Group>
    );
}

export function GradButtons() {
    return (
        <Button.Group>
        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Indigo cyan</Button>
        <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Lime green</Button>
        <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Teal blue</Button>
        <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Orange red</Button>
        <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Peach</Button>
        </Button.Group>
    );
}