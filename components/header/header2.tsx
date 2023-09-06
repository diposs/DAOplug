import { Header } from '@mantine/core';
import  useStyles  from '../style/header.style'
import { HeaderContainer } from '../container/HeaderContainer';

export function  SecondHeader() {
  const { classes } = useStyles();
  return (
<Header height="0dvh" className={classes.styles21}>
<HeaderContainer/>
</Header>
  );
};  
