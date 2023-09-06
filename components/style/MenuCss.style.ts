import { createStyles } from '@mantine/core';


export default createStyles ((theme) => ({
    links: {
        width: '50dvw',
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
      },
    })
    )
