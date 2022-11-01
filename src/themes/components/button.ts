import { mode, transparentize } from "@chakra-ui/theme-tools";
import type { SystemStyleObject, SystemStyleFunction } from "@chakra-ui/styled-system";

const baseStyle: SystemStyleObject = {
    lineHeight: "1.2",
    borderRadius: "md",
    fontWeight: "semibold",
    transitionProperty: "common",
    transitionDuration: "normal",
    _focusVisible: {
        boxShadow: "outline",
    },
    _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        boxShadow: "none",
    },
    _hover: {
        _disabled: {
            bg: "initial",
        },
    },
};

const variantGhost: SystemStyleFunction = (props) => {
    const { colorScheme: c, theme } = props;

    if (c === "gray") {
        return {
            color: mode(`inherit`, `whiteAlpha.900`)(props),
            _hover: {
                bg: mode(`gray.200`, `whiteAlpha.200`)(props),
            },
            _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
        };
    }

    const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
    const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

    return {
        color: mode(`${c}.500`, `${c}.200`)(props),
        bg: "transparent",
        _hover: {
            bg: mode(`brandAlpha.200`, darkHoverBg)(props),
        },
        _active: {
            bg: mode("brandAlpha.200", darkActiveBg)(props),
        },
    };
};

const variantOutline: SystemStyleFunction = (props) => {
    const { colorScheme: c } = props;
    const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
    return {
        border: "1px solid",
        borderColor: c === "gray" ? borderColor : "currentColor",
        ".chakra-button__group[data-attached] > &:not(:last-of-type)": {
            marginEnd: "-1px",
        },
        ...variantGhost(props),
    };
};

type AccessibleColor = {
    bg?: string;
    color?: string;
    hoverBg?: string;
    activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
    yellow: {
        bg: "yellow.400",
        color: "black",
        hoverBg: "yellow.500",
        activeBg: "yellow.600",
    },
    cyan: {
        bg: "cyan.400",
        color: "black",
        hoverBg: "cyan.500",
        activeBg: "cyan.600",
    },
};

/**
 * Custom Variant of Napigo Buttons
 *
 * @param props
 * @returns
 */
const variantSolid: SystemStyleFunction = (props) => {
    const { colorScheme: c } = props;

    if (c === "base") {
        return {
            bg: mode("white", "white")(props),
            borderWidth: "1px",
            borderColor: "border",
            color: mode("text-hard", "text-hard")(props),
            _hover: {
                bg: mode("gray.100", "gray.100")(props),
            },
            _active: {
                bg: mode("gray.200", "gray.200")(props),
            },
        };
    }

    if (c === "gray") {
        return {
            bg: mode("gray.100", "gray.100")(props),
            borderWidth: "1px",
            borderColor: "gray.200",
            color: mode("text-hard", "text-hard")(props),
            _hover: {
                bg: mode("gray.200", "gray.200")(props),
            },
            _active: {
                bg: mode("gray.300", "gray.300")(props),
            },
        };
    }

    if (c === "secondary") {
        return {
            bg: mode("secondary.500", "secondary.500")(props),
            borderWidth: "1px",
            borderColor: "secondary.500",
            color: mode("card", "card")(props),
            _hover: {
                bg: mode("secondary.600", "secondary.600")(props),
                borderColor: "secondary.600",
            },
            _active: {
                bg: mode("secondary.700", "secondary.700")(props),
                borderColor: "secondary.700",
            },
        };
    }
    if (c === "brand-gr") {
        return {
            bgGradient: "linear(to-r, #3BAE5A, #1BA16E)",
            borderWidth: "1px",
            borderColor: "brand.500",
            color: mode("card", "card")(props),
            _hover: {
                bgGradient: "linear(to-l, #3BAE5A, #1BA16E)",
                boxShadow: "md",
                borderColor: "brand.500",
            },
            _active: {
                boxShadow: "md",
                borderColor: "brand.500",
                backgroundPosition: "right center",
            },
        };
    }

    const { bg = `${c}.500`, color = "white", hoverBg = `${c}.600`, activeBg = `${c}.700` } = accessibleColorMap[c] ?? {};

    const background = mode(bg, `${c}.600`)(props);

    return {
        bg: background,
        color: mode(color, `gray.200`)(props),
        _hover: {
            bg: mode(hoverBg, `${c}.500`)(props),
            _disabled: {
                bg: background,
            },
        },
        _active: { bg: mode(activeBg, `${c}.400`)(props) },
    };
};

const variantLink: SystemStyleFunction = (props) => {
    const { colorScheme: c } = props;
    return {
        padding: 0,
        height: "auto",
        lineHeight: "normal",
        verticalAlign: "baseline",
        color: mode(`${c}.500`, `${c}.200`)(props),
        _hover: {
            textDecoration: "underline",
            _disabled: {
                textDecoration: "none",
            },
        },
        _active: {
            color: mode(`${c}.700`, `${c}.500`)(props),
        },
    };
};

const variantUnstyled: SystemStyleObject = {
    bg: "none",
    color: "inherit",
    display: "inline",
    lineHeight: "inherit",
    m: 0,
    p: 0,
};

const variants = {
    ghost: variantGhost,
    outline: variantOutline,
    solid: variantSolid,
    link: variantLink,
    unstyled: variantUnstyled,
};

const sizes: Record<string, SystemStyleObject> = {
    lg: {
        h: 12,
        minW: 12,
        fontSize: "lg",
        px: 6,
    },
    md: {
        h: 10,
        minW: 10,
        fontSize: "md",
        px: 4,
    },
    sm: {
        h: 8,
        minW: 8,
        fontSize: "sm",
        px: 3,
    },
    xs: {
        h: 6,
        minW: 6,
        fontSize: "xs",
        px: 2,
    },
};

const defaultProps = {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
};

const buttonStyles = {
    baseStyle,
    variants,
    sizes,
    defaultProps,
};

export default buttonStyles;

// .btn-grad {
//     background-image: linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%);
//     margin: 10px;
//     padding: 15px 45px;
//     text-align: center;
//     text-transform: uppercase;
//     transition: 0.5s;
//     background-size: 200% auto;
//     color: white;
//     box-shadow: 0 0 20px #eee;
//     border-radius: 10px;
//     display: block;
//   }

//   .btn-grad:hover {
//     background-position: right center; /* change the direction of the change here */
//     color: #fff;
//     text-decoration: none;
//   }
