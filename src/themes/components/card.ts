const Card = {
    baseStyle: {
        display: "flex",
        flexDirection: "column",
        background: "card-body-bg",
        padding: "10px",
        borderWidth: "1px",
        borderColor: "card-border-color",
        gap: 6,
    },
    variants: {
        rounded: {
            padding: 8,
            borderRadius: "xl",
        },
        smooth: {
            padding: 6,
            borderRadius: "md",
        },
        ghost: {
            background: "inherit",
        },
    },
    defaultProps: {
        variant: "smooth",
    },
};

export default Card;
