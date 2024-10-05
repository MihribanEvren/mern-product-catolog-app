import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/product';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={'container.xl'} py={10}>
      <VStack spacing={8}>
        <Text
          bgGradient="linear(to-r, pink.500, purple.500)"
          bgClip="text"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight="bold"
          textAlign={'center'}
          textTransform={'uppercase'}
        >
          Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
            xl: 4,
          }}
          spacing={8}
          w={{ base: '85%', md: 'full' }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray.500'}
          >
            No products found 😖{' '}
            <Link to={'/create'}>
              <Text
                as={'span'}
                color="blue.500"
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
