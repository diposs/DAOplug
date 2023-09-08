import { Header } from '@mantine/core';
import  useStyles  from '../style/header.style'
import { HeaderContainer } from '../container/HeaderContainer';

export function  FirstHeader() {
  const { classes } = useStyles();
  return (
<Header height="100%" className={classes.styles21}>
<HeaderContainer />
</Header>
  );
};  
