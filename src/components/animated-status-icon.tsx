"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

/**
 * Telegram Premium–style animated status emoji.
 * Each `iconType` maps to a specific emoji + subtle looping animation.
 *
 * Performance notes:
 *  - Uses `will-change: transform` to promote to GPU layer
 *  - Keyframes use single-property transforms where possible
 *  - Component is memoised to prevent re-mount/restart on parent re-renders
 *  - `repeatType: "loop"` ensures seamless cycling without stutter
 */

export type AnimatedIconType =
    | "premium-star"
    | "profile-wave"
    | "experience-rocket"
    | "projects-tools"
    | "skills-zap"
    | "contact-mail"
    | "education-cap"
    | "languages-globe"
    | "settings-gear";

interface AnimatedStatusIconProps {
    iconType: AnimatedIconType;
    /** Font-size override — defaults to the surrounding text size */
    size?: string;
    className?: string;
}

/* ------------------------------------------------------------------ */
/*  Emoji look-up                                                     */
/* ------------------------------------------------------------------ */
const ICON_EMOJI: Record<AnimatedIconType, string> = {
    "premium-star": "⭐",
    "profile-wave": "👋",
    "experience-rocket": "🚀",
    "projects-tools": "🌟",
    "skills-zap": "⚡",
    "contact-mail": "📬",
    "education-cap": "🎓",
    "languages-globe": "🌍",
    "settings-gear": "⚙️",
};

/* ------------------------------------------------------------------ */
/*  Animation variants  (GPU-friendly, smooth looping)                */
/* ------------------------------------------------------------------ */

/** Slow 360° rotation + subtle scale pulse — unified timeline */
const premiumStarVariants: Variants = {
    animate: {
        rotate: [0, 360],
        scale: [1, 1.12, 1, 1.12, 1],
        transition: {
            duration: 4,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
        },
    },
};

/** Gentle waving back-and-forth */
const waveVariants: Variants = {
    animate: {
        rotate: [0, 14, -8, 14, 0],
        transition: {
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.6,
        },
    },
};

/** Subtle floating up-and-down via translateY */
const floatVariants: Variants = {
    animate: {
        y: [0, -3, 0],
        transition: {
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
        },
    },
};

/** Slight scale-spin for projects — unified timeline */
const spinGlowVariants: Variants = {
    animate: {
        rotate: [0, 360],
        scale: [1, 1.1, 1, 1.1, 1],
        transition: {
            duration: 5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
        },
    },
};

/** Quick heartbeat / zap pulse */
const pulseVariants: Variants = {
    animate: {
        scale: [1, 1.2, 1, 1.15, 1],
        transition: {
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.8,
        },
    },
};

/** Subtle bounce */
const bounceVariants: Variants = {
    animate: {
        y: [0, -2.5, 0],
        scale: [1, 1.06, 1],
        transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
        },
    },
};

/** Gentle pendulum sway for globe */
const swayVariants: Variants = {
    animate: {
        rotate: [0, 8, -8, 0],
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
        },
    },
};

/** Slow gear rotation */
const gearVariants: Variants = {
    animate: {
        rotate: [0, 360],
        transition: {
            duration: 6,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
        },
    },
};

/* ------------------------------------------------------------------ */
/*  Map icon type → variants                                          */
/* ------------------------------------------------------------------ */
const VARIANT_MAP: Record<AnimatedIconType, Variants> = {
    "premium-star": premiumStarVariants,
    "profile-wave": waveVariants,
    "experience-rocket": floatVariants,
    "projects-tools": spinGlowVariants,
    "skills-zap": pulseVariants,
    "contact-mail": bounceVariants,
    "education-cap": bounceVariants,
    "languages-globe": swayVariants,
    "settings-gear": gearVariants,
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const AnimatedStatusIcon = React.memo(function AnimatedStatusIcon({
    iconType,
    size,
    className = "",
}: AnimatedStatusIconProps) {
    const emoji = ICON_EMOJI[iconType];
    const variants = VARIANT_MAP[iconType];

    return (
        <motion.span
            className={`inline-flex items-center justify-center select-none ${className}`}
            style={{
                fontSize: size ?? "1em",
                lineHeight: 1,
                transformOrigin: iconType === "profile-wave" ? "70% 70%" : "center",
                willChange: "transform",
            }}
            variants={variants}
            animate="animate"
            aria-hidden="true"
        >
            {emoji}
        </motion.span>
    );
});
