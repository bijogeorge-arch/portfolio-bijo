"use client";

import React from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import { DateSeparator } from "@/components/chat/date-separator";
import {
    MessageBubble,
    MessageLabel,
    MessageHeading,
    MessageSubheading,
    MessageList,
    MessageListItem,
} from "@/components/chat/message-bubble";

export function EducationView() {
    return (
        <>
            <DateSeparator>2024 – 2026</DateSeparator>

            <MessageBubble>
                <MessageLabel>
                    <span className="inline-flex items-center gap-1.5">
                        <GraduationCap className="w-3 h-3" />
                        Post-Graduate
                    </span>
                </MessageLabel>
                <MessageHeading>Master of Computer Applications (MCA)</MessageHeading>
                <MessageSubheading>Modi Institute of Management and Technology</MessageSubheading>
                <MessageList>
                    <MessageListItem>
                        Grade: 8.0 / 10.0
                    </MessageListItem>
                    <MessageListItem>
                        Currently pursuing — expected completion 2026
                    </MessageListItem>
                </MessageList>
            </MessageBubble>

            <DateSeparator>2020 – 2023</DateSeparator>

            <MessageBubble>
                <MessageLabel>
                    <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        Under-Graduate
                    </span>
                </MessageLabel>
                <MessageHeading>Bachelor of Computer Applications (BCA)</MessageHeading>
                <MessageSubheading>Career Point University</MessageSubheading>
                <MessageList>
                    <MessageListItem>
                        Grade: 6.2 / 10.0
                    </MessageListItem>
                    <MessageListItem>
                        Specialized in Commerce stream
                    </MessageListItem>
                </MessageList>
            </MessageBubble>

            <DateSeparator>Schooling</DateSeparator>

            <MessageBubble>
                <MessageLabel>
                    <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        High School
                    </span>
                </MessageLabel>
                <div className="space-y-4 mt-1">
                    <div>
                        <MessageHeading>Intermediate (Class XII)</MessageHeading>
                        <MessageSubheading>Emmanuel Mission School · 2019–2020</MessageSubheading>
                        <p className="text-[13px] text-muted-foreground mt-1">Grade: 76.0%</p>
                    </div>
                    <div className="border-t border-border/10 dark:border-white/5 pt-3">
                        <MessageHeading>Matriculation (Class X)</MessageHeading>
                        <MessageSubheading>Emmanuel Mission School · 2017–2018</MessageSubheading>
                        <p className="text-[13px] text-muted-foreground mt-1">Grade: 69.0%</p>
                    </div>
                </div>
            </MessageBubble>

            <DateSeparator>Extra-Curricular</DateSeparator>

            <MessageBubble>
                <MessageLabel>Activities</MessageLabel>
                <MessageList>
                    <MessageListItem>
                        Participated in blood donation camps
                    </MessageListItem>
                    <MessageListItem>
                        Active in quiz competitions and sports — Kabaddi, Football, Badminton
                    </MessageListItem>
                </MessageList>
            </MessageBubble>
        </>
    );
}
