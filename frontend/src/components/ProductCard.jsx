import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useProductStore } from '../../store/product';
import { useState } from 'react';

function ProductCard({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue('purple.600', 'purple.200');
  const bg = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: 'Product updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={'md'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
      bg={bg}
    >
      <Card>
        <CardBody>
          <Image
            src={product.image}
            alt={product.name}
            h={64}
            w={'full'}
            objectFit={'cover'}
            borderRadius="lg"
          />
          <Stack mt="4" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text color={textColor} fontSize="2xl">
              ${product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider color={'purple.300'} />
        <CardFooter>
          <ButtonGroup spacing="2">
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="purple"
            />
            <IconButton
              variant="ghost"
              icon={<DeleteIcon />}
              colorScheme="purple"
              onClick={() => handleDeleteProduct(product._id)}
            />
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  });
                }}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  });
                }}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  });
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update
              </Button>
              <Button variant={'ghost'} onClick={onClose}>
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;
