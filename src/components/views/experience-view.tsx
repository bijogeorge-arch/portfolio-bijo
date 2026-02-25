"use client";

import React from "react";
import { DateSeparator } from "@/components/chat/date-separator";
import {
    MessageBubble,
    MessageHeading,
    MessageSubheading,
    MessageList,
    MessageListItem,
    MessageLabel
} from "@/components/chat/message-bubble";

export function ExperienceView() {
    return (
        <>
            <DateSeparator>2023 - Present</DateSeparator>

            <MessageBubble>
                <MessageLabel>Current Role</MessageLabel>
                <MessageHeading>Senior Software Engineer</MessageHeading>
                <MessageSubheading>TechNova Solutions</MessageSubheading>
                <MessageList>
                    <MessageListItem>
                        Architected and developed a high-traffic SaaS platform using Next.js and Microservices.
                    </MessageListItem>
                    <MessageListItem>
                        Led a team of 5 developers, improving code quality and deployment efficiency by 40%.
                    </MessageListItem>
                    <MessageListItem>
                        Implemented advanced animation systems using Framer Motion and integrated real-time features.
                    </MessageListItem>
                </MessageList>
            </MessageBubble>

            <DateSeparator>2020 - 2022</DateSeparator>

            <MessageBubble>
                <MessageLabel>Previous Role</MessageLabel>
                <MessageHeading>Full-Stack Developer</MessageHeading>
                <MessageSubheading>Creative Dynamics</MessageSubheading>
                <MessageList>
                    <MessageListItem>
                        Built and maintained custom CMS solutions for enterprise clients.
                    </MessageListItem>
                    <MessageListItem>
                        Optimized database queries, reducing response times by 50% across the board.
                    </MessageListItem>
                    <MessageListItem>
                        Collaborated closely with designers to ensure pixel-perfect implementation of UI components.
                    </MessageListItem>
                </MessageList>
            </MessageBubble>
        </>
    );
}
