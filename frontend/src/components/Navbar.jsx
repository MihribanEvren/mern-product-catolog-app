import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW={'full'}
      px={4}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-around'}
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Text
          bgGradient="linear(to-r, purple.500, pink.500)"
          bgClip="text"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight="bold"
          textAlign={'center'}
          textTransform={'uppercase'}
        >
          <Link to={'/'}>🫧Mihi🫧</Link>
        </Text>

        <HStack spacing={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
