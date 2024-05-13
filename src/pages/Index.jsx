import { Box, Container, Flex, Heading, Input, SimpleGrid, Text, VStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error fetching city data:", error));
  }, []);

  const filteredCities = searchTerm
    ? cities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : cities;

  return (
    <Box>
      <Flex as="nav" bg="blue.500" p={4} justifyContent="space-between" alignItems="center">
        <Heading color="white" fontSize="xl">NomadRank</Heading>
      </Flex>
      <Box bgImage="url('/images/tropical-beach.jpg')" bgSize="cover" bgPos="center" h="50vh" display="flex" alignItems="center" justifyContent="center">
        <VStack>
          <Heading color="white" p={4} bg="rgba(0, 0, 0, 0.5)" borderRadius="lg">Find the Best Cities for Digital Nomads</Heading>
          <Text color="white" p={2} bg="rgba(0, 0, 0, 0.5)" borderRadius="lg">Explore top-rated locations based on your lifestyle preferences</Text>
        </VStack>
      </Box>
      <Container maxW="container.xl" p={4}>
        <Input placeholder="Search cities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} py={4}>
          {filteredCities.map(city => (
            <Box key={city.id} p={4} boxShadow="md" borderRadius="lg">
              <Text fontWeight="bold">{city.name}</Text>
              <Text>{city.country}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Index;