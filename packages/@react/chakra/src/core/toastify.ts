import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer: ChakraToastContainer, toast: chakraToast } =
  createStandaloneToast();

export const ToastContainer = ChakraToastContainer;

export const toast = chakraToast;
