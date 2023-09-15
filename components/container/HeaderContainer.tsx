import { Container, Modal, Button, Group, TextInput, Box , Burger, Drawer,Progress, PasswordInput, Text, Center } from '@mantine/core';
import { useDisclosure  } from '@mantine/hooks';
import  useStyles  from '../style/container.style'
import { HeadGroup } from '../inputs/HeaderGroup';
import { MenuGroup } from '../inputs/MenuGroup';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useForm, hasLength, matchesField  } from '@mantine/form';
import lighthouse from '@lighthouse-web3/sdk';
import axios from 'axios';
import { ethers } from "ethers";
import { GsButton, GsLogoutButton } from '../buttons/GSButton';
import { useAuth, usePolybase, useIsAuthenticated } from "@polybase/react";
import { secp256k1, aescbc, decodeFromString, encodeToString, EncryptedDataAesCbc256 } from '@polybase/util';
import { useBoundStore3} from '../../stores/datastate';
import { newDelegatedEthAddress } from '@glif/filecoin-address';
import { hashEthereumSignedMessage  } from '@polybase/eth'
//import { Polybase } from "@polybase/client"
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface FormValues {
  password: string;
  confirmPassword: string;
}
interface FormValues3 {
  privatekey1: string;
  password: string;
  confirmPassword: string;
}
interface FormValues2 {
  password: string;
}
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}
export function HeaderContainer () {
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password:(value) => getStrength(value) !== 100 ? 'Passwords did not meet requirements' : null,
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });
  const form3 = useForm({
    initialValues: {
      privatekey1: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      password:(value) => getStrength(value) !== 100 ? 'Passwords did not meet requirements' : null,
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });
  const form2 = useForm({
    initialValues: {
      password: '',
    },
  });
  
  const { classes } = useStyles();
  const { auth, state } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, handlers] = useDisclosure(false);
  const [opened3, handlers3] = useDisclosure(false);
  const [openedburger, { toggle }] = useDisclosure(false);
  const [pvkeyst, setPvkeyst] = useState<string>('')
  const { inUser, pRecord, updateinUser, pKey, updatepRecord, updatepKey, pvKey, updatepvKey, addressed, setAddressed, lighthouseapi, updatelighthouseapi } = useBoundStore3();
  const [isLoggedIn] = useIsAuthenticated();
  const polybase = usePolybase();
  
  const signInUser =  async() => {
    if(openedburger == true){
      toggle();
    }
    updatepvKey(null);
    updateinUser(null);
    updatepRecord(null);
    updatepKey(null);
    setAddressed(['']);
    updatelighthouseapi(null);
    notifications.clean();
    notifications.show({
      id: 'Login',
      withCloseButton: false,
      autoClose: false,
      title: "Logging In",
      message: 'Logging In / Registration squence started. Contacting Polybase Database',
      color: 'pink',
      loading: true,
    });
    try{
      const res = await auth.signIn();
      console.log(res,'gg')
      let publicKeys: any  = state!.publicKey;
      notifications.update({
        id: 'Login',
        autoClose: false,
        title: "Logging In",
        message: 'Logging In / Registration squence progressing . Polybase Database reached',
        color: 'teal',
        loading: true,
      });
      updateinUser(publicKeys);
      const userData = await polybase.collection('User').record(publicKeys).get();
      const exists = userData.exists();
      if(exists == false){
        if(res!.type =='email'){
          open();//handlers.open();//open();
        } else{
          handlers3.open()
        }
      }else{
        setPvkeyst(userData.data.pvkeyst as string ||'');
        setAddressed(userData.data.address as string[] ||['']);
        updatelighthouseapi(userData.data.lighthousekeyst as string ||'');
        handlers.open();
      }
    }catch(e){
      notifications.update({
        id: 'Login',
        withCloseButton: true,
        autoClose: 4000,
        title: "Logging In Failed",
        message: 'Logging In / Registration squence failed!',
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  };
  const signoutUser =  async() => {
    await auth.signOut();
    updatepvKey(null);
    updateinUser(null);
    updatepRecord(null);
    updatepKey(null);
    setAddressed(['']);
    updatelighthouseapi(null);
  }
  const handleSubmit = async(values: FormValues) => {
    form.reset();
    let publicq: any = state!.publicKey || '';
    const privateKey = await secp256k1.generatePrivateKey();
    var dud = await secp256k1.getPublicKey64(privateKey);
    var walled1 = await new ethers.Wallet(privateKey);
    const filAddress = newDelegatedEthAddress(walled1.address || '');
    let addman = []
    addman.push(walled1.address.toString());
    addman.push(filAddress.toString());
    var dud2 = encodeToString(dud,'hex')
    const keys = decodeFromString(publicq, 'hex');
    const key =  keys.subarray(0,16);
    const passkey = decodeFromString(values.password, 'utf8');
    var mergedArray = new Uint8Array(key.length + passkey.length);
    mergedArray.set(key);
    mergedArray.set(passkey, key.length);
    var hashkun = hashEthereumSignedMessage(mergedArray);
    var hashkunkey = decodeFromString(hashkun, 'hex');
    var hashkun1 = hashkunkey.subarray(0,32);
    var newhashkunkey = new Uint8Array(hashkun1.length);
    newhashkunkey.set(hashkun1);
    const encryptedData = await aescbc.symmetricEncrypt(newhashkunkey, privateKey);
    const encryptedDataJson = {version: encryptedData.version, nonce: encryptedData.nonce, ciphertext: encryptedData.ciphertext, };
    const encryptedDataJsonstr = JSON.stringify(encryptedDataJson);
    const strDataAsUint8Array = decodeFromString(encryptedDataJsonstr, 'utf8');
    const str = encodeToString(strDataAsUint8Array, 'hex');
    const str2 = str.toString();
    const getApiKey = async() =>{
      const verificationMessage = (
        await axios.get(
            `https://api.lighthouse.storage/api/auth/get_message?publicKey=${walled1.address}`
        )
      ).data
      const signedMessage = await walled1.signMessage(verificationMessage);
      const response = await lighthouse.getApiKey(walled1.address, signedMessage);;
      let litt: any = response!.data.apiKey || null;
      return(litt);
    }
    var lighthousekey :any = await getApiKey();
    const userData314 = await polybase.collection('User').create([publicq,str2,state!.type, addman, lighthousekey, dud2.toString()]);
    console.log(userData314,'userData314');
    updatepRecord(dud2);
    updatepKey(dud);
    updatepvKey(privateKey);
    setAddressed(addman);
    updatelighthouseapi(lighthousekey);
    close();
  }
  const handleSubmit3 = async(values: FormValues3) => {
    try {
      form3.reset();
      let publicq: any = state!.publicKey || '';
      var walled1 = await new ethers.Wallet(values.privatekey1);
      const filAddress = newDelegatedEthAddress(walled1.address || '');
      let addman = []
      addman.push(walled1.address.toString());
      addman.push(filAddress.toString());
      const recordkey = '0x' + walled1.publicKey.slice(4);
      if(recordkey != publicq) throw 'error';
      const privateKey = decodeFromString(values.privatekey1, 'hex');
      const keys = decodeFromString(publicq, 'hex');
      const key =  keys.subarray(0,16);
      const passkey = decodeFromString(values.password, 'utf8');
      var mergedArray = new Uint8Array(key.length + passkey.length);
      mergedArray.set(key);
      mergedArray.set(passkey, key.length);
      var hashkun = hashEthereumSignedMessage(mergedArray);
      var hashkunkey = decodeFromString(hashkun, 'hex');
      var hashkun1 = hashkunkey.subarray(0,32);
      var newhashkunkey = new Uint8Array(hashkun1.length);
      newhashkunkey.set(hashkun1);
      const encryptedData = await aescbc.symmetricEncrypt(newhashkunkey, privateKey);
      const encryptedDataJson = {version: encryptedData.version, nonce: encryptedData.nonce, ciphertext: encryptedData.ciphertext, };
      const encryptedDataJsonstr = JSON.stringify(encryptedDataJson);
      const strDataAsUint8Array = decodeFromString(encryptedDataJsonstr, 'utf8');
      const str = encodeToString(strDataAsUint8Array, 'hex');
      const str2 = str.toString();
      const getApiKey = async() =>{
        const verificationMessage = (
          await axios.get(
              `https://api.lighthouse.storage/api/auth/get_message?publicKey=${walled1.address}`
          )
        ).data
        const signedMessage = await walled1.signMessage(verificationMessage);
        const response = await lighthouse.getApiKey(walled1.address, signedMessage);;
        let litt: any = response!.data.apiKey || null;
        return(litt);
      }
      var lighthousekey :any = await getApiKey();
      const userData314 = await polybase.collection('User').create([publicq,str2,state!.type, addman, lighthousekey, recordkey]);
      console.log(userData314,'userData314');
      updatepRecord(recordkey);
      updatepKey(keys);
      updatepvKey(privateKey);
      setAddressed(addman);
      updatelighthouseapi(lighthousekey);
      handlers3.close();
    }catch(e){
      console.log(e);
      form3.setErrors({privatekey1: <p>Invalid PrivateKey</p>,});
      form3.errors;
    }
  }
  const handleSubmit2 = async(values: FormValues2) => {
    try {
      form2.reset();
      let publicq: any = state!.publicKey || '';
      const decryptedValue = decodeFromString(pvkeyst,  'hex');
      const strdd = encodeToString(decryptedValue, 'utf8');
      const decryptedData = JSON.parse(strdd);
      const key1s = decodeFromString(publicq, 'hex');
      const key1 =  key1s.subarray(0,16);
      const passkey1 = decodeFromString(values.password, 'utf8');
      var mergedArray1 = new Uint8Array(key1.length + passkey1.length);
      mergedArray1.set(key1);
      mergedArray1.set(passkey1, key1.length);
      var hashkun = hashEthereumSignedMessage(mergedArray1);
      var hashkunkey = decodeFromString(hashkun, 'hex');
      var hashkun1 = hashkunkey.subarray(0,32);
      var newhashkunkey = new Uint8Array(hashkun1.length);
      newhashkunkey.set(hashkun1);
      var nonce = decryptedData.nonce;
      var resultnonce = [];
      var resultciphertext = [];
      var ciphertext = decryptedData.ciphertext;
      for(var i in nonce){
        resultnonce.push(nonce[i]);
      }
      for(var i in ciphertext){
        resultciphertext.push(ciphertext[i]);
      }
      const decryptedDataJson = {version: decryptedData.version, nonce: new Uint8Array(resultnonce), ciphertext: new Uint8Array(resultciphertext), };
      const strData = await aescbc.symmetricDecrypt(newhashkunkey, decryptedDataJson);
      const publicKey2 = await secp256k1.getPublicKey64(strData);
      const precordalpha = encodeToString(publicKey2, 'hex');
      var walled1 = await new ethers.Wallet(strData);
      if(!addressed.includes(walled1.address.toString())) throw 'Errored';
      updatepRecord(precordalpha);
      updatepKey(publicKey2);
      updatepvKey(strData);
      handlers.close();
    }catch(e){
      console.log('Error log',e);
      form2.setErrors({ password: <p>Invalid Email/Password/PublicKey</p>, });
      form2.errors;
    }
  }
  const valued = form.values.password;
  const valued2 = form2.values.password;
  const valued3 = form3.values.password;
  const strength = getStrength(valued);
  const strength3 = getStrength(valued3);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(valued)} />
  ));
  const checks2 = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(valued2)} />
  ));
  const checks3 = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(valued3)} />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '200ms' } }}
        value={
          valued.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));
  const bars3 = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '700ms' } }}
        value={
          valued3.length > 0 && index === 0 ? 100 : strength3 >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength3 > 80 ? 'teal' : strength3 > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));
  useEffect(() => {
    auth!.onAuthUpdate((authState) => {
      if (authState!) {
        updateinUser(authState.publicKey!.toString());
      }
    })
  },[auth,updateinUser])
  return (
  <Container className={classes.inner} fluid>
    <HeadGroup/>
    {isLoggedIn && (pKey != null) && (state!.publicKey == inUser)  ? (<GsLogoutButton className={classes.mobile} onClick={signoutUser} />) : (<GsButton onClick={signInUser} className={classes.mobile} />)}
    <Burger opened={openedburger} onClick={toggle} className={classes.nonMobile} />
    <Modal opened={opened} onClose={close} size="auto" centered withCloseButton={false} closeOnClickOutside={false}>
      <Box component="form" miw={{ base: "100%", xs: 343, sm: 343, md: 343, lg: 343, xl: 343 }} mx="auto" onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput placeholder="Your password" label="Password" required {...form.getInputProps('password')} />
        <Group spacing={5} grow mt="xs" mb="md">
          {bars}
        </Group>
        <PasswordRequirement label="Has at least 6 characters" meets={valued.length >= 6} />
        {checks}
        <PasswordInput placeholder="Confirm Password" label="Confirm Password" required{...form.getInputProps('confirmPassword')} />
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Box>
    </Modal>
    <Modal opened={opened2} onClose={() => handlers.close()} size="auto" centered withCloseButton={false} closeOnClickOutside={false}>
      <Box component="form" miw={{ base: "100%", xs: 277, sm: 277, md: 277, lg: 277, xl: 277 }} mx="auto" onSubmit={form2.onSubmit(handleSubmit2)}>
        <PasswordInput placeholder="Your password" label="Password" required {...form2.getInputProps('password')} />
        <Group spacing={5} grow mt="xs" mb="md"/>
        <PasswordRequirement label="Has at least 6 characters" meets={valued2.length >= 6} />
        {checks2}
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Box>
    </Modal>
    <Modal opened={opened3} onClose={() => handlers3.close()} size="auto" centered withCloseButton={false} closeOnClickOutside={false}>
      <Box component="form" miw={{ base: "100%", xs: 402, sm: 402, md: 402, lg: 402, xl: 402 }} mx="auto" onSubmit={form3.onSubmit(handleSubmit3)}>
        <TextInput placeholder="Your Private Key" label="Private Key" required {...form3.getInputProps('privatekey1')} />
        <PasswordInput placeholder="Your password" label="Password" required {...form3.getInputProps('password')} />
        <Group spacing={5} grow mt="xs" mb="md">
          {bars3}
        </Group>
        <PasswordRequirement label="Has at least 6 characters" meets={valued3.length >= 6} />
        {checks3}
        <PasswordInput placeholder="Confirm Password" label="Confirm Password" required{...form3.getInputProps('confirmPassword')} />
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Box>
    </Modal>
    <Drawer opened={openedburger} onClose={toggle} classNames={{root: classes.nonMobile, content: classes.controldd,}} position="bottom" size='60dvh' title="  " withCloseButton={false}>
      {Array(12).fill(0).map((_, index) => {return <p key={index}>Drawer with scroll</p>;})}
      {isLoggedIn && (pKey != null) && (state!.publicKey == inUser)  ? (<GsLogoutButton onClick={signoutUser} className={classes.nonMobile} />) : (<GsButton onClick={signInUser}className={classes.nonMobile} />)}
    </Drawer>
  </Container>
  );
}; 
