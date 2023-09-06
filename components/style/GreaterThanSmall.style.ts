import { createStyles } from '@mantine/core';


export default createStyles ((theme) => ({
    mobile: {
        [theme.fn.smallerThan('sm')]: {
          display: 'none',
        },
    },
    nonMobile: {
        [theme.fn.largerThan('sm')]: {
          display: 'none',
        },
  },
})
)
