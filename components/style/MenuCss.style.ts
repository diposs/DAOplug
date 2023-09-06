import { createStyles } from '@mantine/core';


export default createStyles ((theme) => ({
    links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: '5px',
  },
})
)
