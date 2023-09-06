import {TextInput, Stack, Button } from '@mantine/core';

export function Mody() {
    return(
        <>
        <TextInput 
        placeholder="Your name"
        label="Full name"
        withAsterisk
        />

        <Stack align="center" spacing="xs">
        <Button variant="subtle" size="lg">Sign Up Without Username</Button>
        <Button color="violet" size="lg">Sign Up</Button>
        <Button color="red" size="lg">Close</Button>
      </Stack>
      </>
    );
} 