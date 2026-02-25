"use client";

import React from "react";
import Lottie from "lottie-react";
import { useAnimations } from "@/context/animation-context";

interface LottieAnimationProps {
    animationData: object;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export function LottieAnimation({
    animationData,
    loop = true,
    autoplay = true,
    className,
    style,
}: LottieAnimationProps) {
    const { animationsEnabled } = useAnimations();

    if (!animationsEnabled) {
        return null;
    }

    return (
        <Lottie
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            className={className}
            style={style}
        />
    );
}
