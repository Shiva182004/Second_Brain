import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

export interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center hover:cursor-pointer";

export const Button = (props: ButtonProps) => {

    return <button
        className={`${variantStyles[props.variant]} ${defaultStyles} ${(props.fullWidth)?"w-full flex items-center justify-center":""} ${props.loading ? "opacity-45" : ""}`} onClick={props.onClick} disabled={props.loading}
    >
        {props.startIcon ? <div className="pr-2" >{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>
}