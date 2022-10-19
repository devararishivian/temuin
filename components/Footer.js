import * as React from 'react';
import { NativeBaseProvider, Box, Center, HStack, Pressable, Text } from "native-base";

export default function Footer() {
    const [selected, setSelected] = React.useState(1);
    
    return (
        <NativeBaseProvider>
            <Box flex={1} bg="white" safeAreaTop width="100%" maxW="300px" alignSelf="center">
                <Center flex={1}></Center>
                <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
                        <Center>\
                            <Text color="white" fontSize="12">
                                Home
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
                        <Center>
                            <Text color="white" fontSize="12">
                                Search
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
                        <Center>
                            <Text color="white" fontSize="12">
                                Cart
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
                        <Center>
                            <Text color="white" fontSize="12">
                                Account
                            </Text>
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
        </NativeBaseProvider>
    );
}