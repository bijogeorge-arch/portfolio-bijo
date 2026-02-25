"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatFeedProps {
    children: React.ReactNode;
    activeTab: string;
    /** Direction: 1 = forward (slide from bottom), -1 = backward (slide from top) */
    direction?: number;
}

export function ChatFeed({ children, activeTab, direction = 1 }: ChatFeedProps) {
    const slideOffset = 40;

    const variants = {
        enter: (dir: number) => ({
            opacity: 0,
            y: dir > 0 ? slideOffset : -slideOffset,
        }),
        center: {
            opacity: 1,
            y: 0,
        },
        exit: (dir: number) => ({
            opacity: 0,
            y: dir > 0 ? -slideOffset : slideOffset,
        }),
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={activeTab}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    duration: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex flex-col space-y-1 w-full"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.05,
                            },
                        },
                    }}
                    className="flex flex-col w-full"
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
