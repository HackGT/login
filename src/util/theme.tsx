import { extendTheme } from "@chakra-ui/react";
import {
  mode,
  StyleFunctionProps,
  transparentize,
} from "@chakra-ui/theme-tools";

const Button = {
  baseStyle: {
    ":focus:not(:focus-visible)": {
      boxShadow: "none",
    },
    fontWeight: "medium",
  },
  variants: {
    primary: (props: StyleFunctionProps) =>
      props.theme.components["Button"]["variants"]["solid"]({
        ...props,
        variant: "solid",
        colorScheme: "blue",
      }),
    secondary: (props: StyleFunctionProps) =>
      props.theme.components["Button"]["variants"]["outline"]({
        ...props,
        variant: "outline",
        colorScheme: "gray",
      }),
  },
};

const Checkbox = {
  baseStyle: (props: StyleFunctionProps) => ({
    label: {
      color: mode("gray.700", "gray.100")(props),
      fontWeight: "medium",
    },
  }),
  sizes: {
    md: {
      label: {
        fontSize: "sm",
      },
    },
  },
  defaultProps: {
    colorScheme: "blue",
  },
};

const FormLabel = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("gray.700", "gray.100")(props),
    mb: "1.5",
    fontSize: "sm",
  }),
};

const Heading = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("gray.900", "white")(props),
    fontWeight: "semibold",
  }),
  sizes: {
    "2xl": {
      fontSize: "7xl",
      lineHeight: "5.625rem",
      letterSpacing: "tight",
    },
    xl: {
      fontSize: "6xl",
      lineHeight: "4.5rem",
      letterSpacing: "tight",
    },
    lg: {
      fontSize: "5xl",
      lineHeight: "3.75rem",
      letterSpacing: "tight",
    },
    md: {
      fontSize: "4xl",
      lineHeight: "2.75rem",
      letterSpacing: "tight",
    },
    sm: {
      fontSize: "3xl",
      lineHeight: "2.375rem",
    },
    xs: {
      fontSize: "2xl",
      lineHeight: "2rem",
    },
  },
};

const Input = {
  variants: {
    outline: (props: StyleFunctionProps) => ({
      field: {
        bg: mode("white", "gray.700")(props),
        color: "emphasized",
        _focus: {
          borderColor: mode("blue.500", "blue.300")(props),
          boxShadow: mode(
            `0px 0px 0px 1px ${transparentize(`blue.500`, 1.0)(props.theme)}`,
            `0px 0px 0px 1px ${transparentize(`blue.200`, 1.0)(props.theme)}`
          )(props),
        },
        _placeholder: {
          opacity: 1,
          color: "muted",
        },
      },
    }),
  },
};

const Container = {
  baseStyle: {
    maxW: "7xl",
    px: { base: "4", md: "8" },
  },
};

const shadows = {
  xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
  sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
  md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
  lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
  xl: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
  "2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
  "3xl": "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
  base: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
};

export default extendTheme({
  fonts: {
    heading: "InterVariable, -apple-system, system-ui, sans-serif",
    body: "InterVariable, -apple-system, system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        color: "text",
      },
    },
  },
  shadows,
  semanticTokens: {
    colors: {
      emphasized: {
        default: "gray.900",
        _dark: "white",
      },
      text: {
        default: "gray.600",
        _dark: "gray.300",
      },
      muted: {
        default: "gray.500",
        _dark: "gray.400",
      },
    },
  },
  components: {
    Button,
    Checkbox,
    Container,
    FormLabel,
    Heading,
    Input,
  },
});
