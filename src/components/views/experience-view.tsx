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
            <DateSeparator>April 2023 – April 2024</DateSeparator>

            <MessageBubble>
                <MessageLabel>Professional Experience</MessageLabel>
                <MessageHeading>Frontend Trainee</MessageHeading>
                <MessageSubheading>Spanco Web Technologies · Kota, Rajasthan</MessageSubheading>
                <MessageList>
                    <MessageListItem>
                        Conducted in-depth research and analysis of existing web applications to understand UI/UX patterns, features, and design structures.
                    </MessageListItem>
                    <MessageListItem>
                        Designed and developed Shopify applications using Polaris components, ensuring consistency with Shopify&apos;s design system.
                    </MessageListItem>
                    <MessageListItem>
                        Evaluated and customized Shopify themes, including layouts, settings, and visual styling for improved user experience.
                    </MessageListItem>
                    <MessageListItem>
                        Collaborated on translating design references into functional, responsive UI components.
                    </MessageListItem>
                    <MessageListItem>
                        Enhanced frontend performance via theme inspection, optimization, and organized project bundling.
                    </MessageListItem>
                </MessageList>
            </MessageBubble>

            <DateSeparator>June 2022 – August 2022</DateSeparator>

            <MessageBubble>
                <MessageLabel>Internship</MessageLabel>
                <MessageHeading>Software Intern</MessageHeading>
                <MessageSubheading>Lata Softwares · Kota, Rajasthan</MessageSubheading>
                <MessageList>
                    <MessageListItem>
                        Completed intensive training in C# programming fundamentals.
                    </MessageListItem>
                    <MessageListItem>
                        Gained foundational understanding of software development workflows and best practices.
                    </MessageListItem>
                </MessageList>
            </MessageBubble>
        </>
    );
}
