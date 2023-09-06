import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { Input, LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { Searchiconright } from '../icons/searchIcon'
interface FormValus {
  search: string | null;
}
export function SearchBar() {
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm<FormValus>({
    initialValues: {
      search: null,
    },
  });
  const router = useRouter()
  const handleSearch = async(values: FormValus) => {
    if (typeof values.search === 'string'){
      toggle();
      console.log(values);
      router.push('/search/'+values.search)
      form.reset();
    } else{
      form.setErrors({ search: 'Search Input Empty'});
      form.errors;
    }
  }
  return (
    <>
    <LoadingOverlay
      loaderProps={{ size: 'lg', color: 'pink', variant: 'bars' }}
      overlayOpacity={0.3}
      overlayBlur={2}
      overlayColor="#c5c5c5"
      visible={visible}
      transitionDuration= {2000}
    />
    <form onSubmit={form.onSubmit(handleSearch)}  >
    <Input
      icon={< IconSearch size="2.125rem" />}
      rightSection={< Searchiconright type="submit" /> }
      miw="60dvw"
      data-autofocus
      placeholder="Search NFT By ENS OR Wallet Address"
      variant="filled"
      radius="xl"
      size="xl"
      {...form.getInputProps('search')}
    />
    </form>
      </>
  );
}
