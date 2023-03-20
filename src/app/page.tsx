"use client"

import { Avatar, Box, Container, Flex, FormControl, Heading, Icon, IconButton, Image, Input, SkeletonText, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AiFillWarning, AiTwotoneThunderbolt } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { richTextThemeComponents } from 'src/components';
import { v4 as uuid } from 'uuid';
import z from 'zod';

const promptSchemaValidation = z.object({
  prompt: z.string().min(50).max(1000),
})

type PromptFormData = z.infer<typeof promptSchemaValidation>

export const emptyState = () => {
  return (
    <Container flex={1} maxW="4xl" p={2}>
      <Flex h="100%" direction="column" justifyContent="center" alignItems="center">
        <Heading py={4} fontSize="lg" textAlign="center">G4 Analisador de Pitch de vendas</Heading>
        <Flex gap={4} wrap="wrap" justifyContent="center" alignItems="center">
          <Flex flex={1} minW="sm" gap={2} direction="column" alignItems="center">
            <Icon as={AiTwotoneThunderbolt} fontSize="18px" />
            <Text ml={2}>Capacidades</Text>
            <Flex w="100%" maxW="sm" minH="16" p={2} bg="gray.100" borderRadius="md" direction="column" justifyContent="center">
              <Text textAlign="center" fontWeight="bold" color="gray.600" noOfLines={4} fontSize="xs">
                Análise de pitch de vendas treinado com pitchs reais selecionados pelo G4
              </Text>
            </Flex>
            <Flex w="100%" maxW="sm" minH="16" p={2} bg="gray.100" borderRadius="md" direction="column" justifyContent="center">
              <Text textAlign="center" fontWeight="bold" color="gray.600" noOfLines={4} fontSize="xs">
                Sugestão de melhorias passo a passo, para garantir o sucesso do seu pitch
              </Text>
            </Flex>
            <Flex w="100%" maxW="sm" minH="16" p={2} bg="gray.100" borderRadius="md" direction="column" justifyContent="center">
              <Text textAlign="center" fontWeight="bold" color="gray.600" noOfLines={4} fontSize="xs">
                Destaques dos pontos fortes e fracos do seu pitch
              </Text>
            </Flex>
          </Flex>
          <Flex flex={1} minW="sm" gap={2} direction="column" alignItems="center">
            <Icon as={AiFillWarning} fontSize="18px" />
            <Text>Limitações</Text>
            <Flex w="100%" maxW="sm" minH="16" p={2} bg="gray.100" borderRadius="md" direction="column" justifyContent="center">
              <Text textAlign="center" fontWeight="bold" color="gray.600" noOfLines={4} fontSize="xs">
                Pitchs com mais de 1000 caracteres podem não ser analisados corretamente
              </Text>
            </Flex>
            <Flex w="100%" maxW="sm" minH="16" p={2} bg="gray.100" borderRadius="md" direction="column" justifyContent="center">
              <Text textAlign="center" fontWeight="bold" color="gray.600" noOfLines={4} fontSize="xs">
                Temas inapropriados podem não ser analisados
              </Text>
            </Flex>
            <Flex w="100%" maxW="sm" minH="16" px={2} bg="gray.100" borderRadius="md" direction="column" justifyContent="center">
              <Text textAlign="center" fontWeight="bold" color="gray.600" noOfLines={4} fontSize="xs">
                Por ser treinada para analisar Pitchs, outros temas podem não fornecer respostas satisfatórias
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex >
    </Container >
  )
}


export default function Home() {
  const [messagesQueue, setMessagesQueue] = useState<{ requestMessage: string; responseMessage: string, id: string, isLoading: boolean }[]>([]);
  const { register, handleSubmit, formState, setValue } = useForm<PromptFormData>();

  useEffect(() => {
    // scroll in to view to bottom of bosy on add messages
    const id = 'bottom-bar'

    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messagesQueue]);

  const handleSendMessage = async (promptData: PromptFormData) => {
    const { prompt } = promptData;
    console.log(prompt)
    const currentId = uuid();

    setMessagesQueue((prev) => [...prev, { requestMessage: prompt || '', responseMessage: '', id: currentId, isLoading: true }]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunkValue = decoder.decode(value);

      console.log(chunkValue);

      setMessagesQueue((prev) => prev.map((message) => {
        const previousResponseMessage = message.responseMessage;
        if (message.id === currentId) {
          return { ...message, responseMessage: previousResponseMessage + chunkValue, isLoading: false };
        }
        return message;
      }));
    }

    setValue('prompt', '');
  };

  return (
    <Flex h="100vh" w="full" flexDirection="column">
      <Flex minH="100%" direction="column">
        {messagesQueue.length === 0 ?
          emptyState() : messagesQueue.map((message, index) =>
            <Fragment key={'list-with-message' + index}>
              <Flex bg="#0C1E5F" py={4}>
                <Container maxW="4xl" p={0}>
                  <Flex w="full" p={2} pr={4} gap={4} >
                    <Avatar size="sm" bg='#E76353' />
                    <Text textAlign="justify" fontWeight="semibold" fontSize="sm" color="white">{message.requestMessage}</Text>
                  </Flex>
                </Container>
              </Flex>
              <Flex py={4} pb={8}>
                <Container maxW="4xl" p={0}>
                  <Flex w="full" p={2} pr={4} gap={4}>
                    <Flex maxW="40px" maxH="40px" overflow="hidden" borderRadius="md">
                      <Image src="/openai.png" alt="Logo" />
                    </Flex>
                    {message.isLoading ?
                      (
                        <SkeletonText w="full" skeletonHeight={4} noOfLines={3} />
                      ) :
                      (
                        <Flex pb={8} id={'list-with-message' + index} flexDirection="column" gap={2}>
                          <ReactMarkdown components={ChakraUIRenderer(richTextThemeComponents)} skipHtml>
                            {message.responseMessage || ''}
                          </ReactMarkdown>
                        </Flex>
                      )}

                  </Flex>
                </Container>
              </Flex>
            </Fragment>
          )}
        <Flex id="bottom-bar" mt="auto" bg="#0C1E5F" h={40} minH={40} w="full" />
      </Flex>

      <Flex bg="linear-gradient(180deg,transparent,#0C1E5F 40.85%);" py={6} position="fixed" w="full" bottom="0" h="40">
        <Container maxW="4xl">
          <Box as="form" w="full" onSubmit={handleSubmit(handleSendMessage)}>
            <FormControl id="prompt" w="full" isRequired>
              <Flex w="full" py={4} gap={4}>
                <Input isDisabled={formState.isSubmitting} {...register('prompt')} name="prompt" maxLength={1000} variant="filled" flex="1" placeholder='Digite seu pitch aqui...' _focus={{ bg: "white" }} />
                <IconButton isLoading={formState.isSubmitting} type="submit" variant="solid" aria-label='enviar' colorScheme="red" bg="#E76353" icon={<TbSend />} />
              </Flex>
            </FormControl>
          </Box>
          <Flex justifyContent="center" alignItems="center" py={4}>
            <Text color="gray.300">Powered by <strong>OpenAI</strong> built by <strong>G4</strong>.</Text>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
}
