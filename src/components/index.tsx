import { Box, Code, Divider, Heading, Image, Link, List, ListItem, Skeleton, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export const richTextThemeComponents = {
  p: (props: any) => {
    const { children } = props;
    return (
      <Text textAlign="justify" fontWeight="semibold" fontSize="sm" color="gray.600">
        {children}
      </Text>
    );
  },
  h1: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h1" size="lg" color="gray.900">
        {children}
      </Heading>
    );
  },
  h2: (props: any) => {
    const { children } = props;
    return (
      <Heading py={4} textAlign="center" as="h2" size="lg" color="gray.900">
        {children}
      </Heading>
    );
  },
  h3: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h3" size="md" color="gray.900">
        {children}
      </Heading>
    );
  },
  h4: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h4" size="xs" color="gray.900">
        {children}
      </Heading>
    );
  },
  img: (props: any) => {
    const { src, alt } = props;
    return (
      <Box
        mt={4}
        mb={4}
        w="100%"
        h="auto"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
      >
        <Image
          src={src}
          alt={alt}
          fallback={<Skeleton borderRadius="md" boxShadow="md" w="full" h={60} />}
          objectFit="cover"
          w="100%"
          h="auto"
          loading="eager"
        />
      </Box>
    );
  },
  ul: (props: any) => {
    const { children } = props;
    return (
      <List spacing={2} pl={4}>
        {children}
      </List>
    );
  },
  li: (props: any) => {
    const { children } = props;
    return (
      <ListItem>
        <Text color="gray.600">{children}</Text>
      </ListItem>
    );
  },
  a: (props: any) => {
    const { children, href } = props;
    return (
      <Link href={href} isExternal color="blue.500">
        {children}
      </Link>
    );
  },
  blockquote: (props: any) => {
    const { children } = props;
    return (
      <Box
        as="blockquote"
        borderLeft="4px solid"
        borderColor="gray.200"
        pl={4}
        my={4}
      >
        {children}
      </Box>
    );
  },
  hr: (props: any) => {
    const { children } = props;
    return (
      <Divider
        my={4}
        borderColor="gray.200"
        orientation="horizontal"
        variant="solid"
      />
    );
  },
  table: (props: any) => {
    const { children } = props;
    return (
      <Table variant="simple" size="sm" colorScheme="gray">
        {children}
      </Table>
    );
  },
  thead: (props: any) => {
    const { children } = props;
    return <Thead>{children}</Thead>;
  },
  tbody: (props: any) => {
    const { children } = props;
    return <Tbody>{children}</Tbody>;
  },
  tr: (props: any) => {
    const { children } = props;
    return <Tr>{children}</Tr>;
  },
  th: (props: any) => {
    const { children } = props;
    return (
      <Th
        px={4}
        py={2}
        bg="gray.100"
        color="gray.600"
        fontWeight="medium"
        fontSize="sm"
      >
        {children}
      </Th>
    );
  },
  td: (props: any) => {
    const { children } = props;
    return (
      <Td px={4} py={2} color="gray.600" fontSize="sm">
        {children}
      </Td>
    );
  },
  code: (props: any) => {
    const { children } = props;
    return (
      <Code
        px={2}
        py={1}
        w="full"
        bg="gray.100"
        color="gray.600"
        fontSize="sm"
        borderRadius="md"
      >
        {children}
      </Code>
    );
  },
  pre: (props: any) => {
    const { children } = props;
    return (
      <Box
        as="pre"
        my={4}
        p={4}
        bg="gray.100"
        color="gray.600"
        fontSize="sm"
        borderRadius="md"
        overflow="auto"
      >
        {children}
      </Box>
    );
  },
  inlineCode: (props: any) => {
    const { children } = props;
    return (
      <Code
        px={2}
        py={1}
        bg="gray.100"
        color="gray.600"
        fontSize="sm"
        borderRadius="md"
      >
        {children}
      </Code>
    );
  },
  del: (props: any) => {
    const { children } = props;
    return (
      <Text as="del" color="gray.400">
        {children}
      </Text>
    );
  },
  strong: (props: any) => {
    const { children } = props;
    return <Text as="strong" color="gray.800">{children}</Text>;
  },
  em: (props: any) => {
    const { children } = props;
    return <Text as="em" color="gray.800">{children}</Text>;
  },
}