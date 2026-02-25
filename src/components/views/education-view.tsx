"use client";

import React from "react";
import { Award, BookOpen } from "lucide-react";
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
            <DateSeparator>2016 – 2020</DateSeparator>

            <MessageBubble>
                <MessageLabel>
                    <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        Degree
                    </span>
                </MessageLabel>
                <MessageHeading>B.Sc. Computer Science</MessageHeading>
                <MessageSubheading>State University of Technology</MessageSubheading>
                <MessageList>
                    <MessageListItem>
                        Graduated with First Class Honours — GPA 3.85/4.0
                    </MessageListItem>
                    <MessageListItem>
                        Senior thesis on &ldquo;Real-Time Collaborative Editing Using CRDTs&rdquo;
                    </MessageListItem>
                    <MessageListItem>
                        Teaching Assistant for Data Structures &amp; Algorithms (2 semesters)
                    </MessageListItem>
                </MessageList>
            </MessageBubble>

            <MessageBubble>
                <MessageLabel>
                    <span className="inline-flex items-center gap-1.5">
                        <Award className="w-3 h-3" />
                        Honors &amp; Activities
                    </span>
                </MessageLabel>
                <MessageList>
                    <MessageListItem>
                        Dean&apos;s List — All 8 semesters
                    </MessageListItem>
                    <MessageListItem>
                        Won 1st Place at University Hackathon 2019 — &ldquo;Smart Campus&rdquo; IoT project
                    </MessageListItem>
                    <MessageListItem>
                        Computer Science Society — Vice President (2018–2019)
                    </MessageListItem>
                </MessageList>
            </MessageBubble>

            <DateSeparator>Certifications</DateSeparator>

            <MessageBubble>
                <MessageLabel>Professional Development</MessageLabel>
                <div className="space-y-3 mt-1">
                    <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-chart-2/10 text-chart-2 shrink-0 mt-0.5">
                            <Award className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[14px] font-medium text-foreground">AWS Certified Solutions Architect</p>
                            <p className="text-[12px] text-muted-foreground">Amazon Web Services • 2023</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-chart-5/10 text-chart-5 shrink-0 mt-0.5">
                            <Award className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[14px] font-medium text-foreground">Meta Front-End Developer Professional</p>
                            <p className="text-[12px] text-muted-foreground">Coursera / Meta • 2022</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-chart-3/10 text-chart-3 shrink-0 mt-0.5">
                            <Award className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[14px] font-medium text-foreground">Google UX Design Certificate</p>
                            <p className="text-[12px] text-muted-foreground">Google • 2021</p>
                        </div>
                    </div>
                </div>
            </MessageBubble>
        </>
    );
}
