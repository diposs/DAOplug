import { createStyles } from '@mantine/core';


export default createStyles ((theme) => ({
    burgerCss: {
        [theme.fn.largerThan('sm')]: {
          display: 'none',
        },
  },
})
)