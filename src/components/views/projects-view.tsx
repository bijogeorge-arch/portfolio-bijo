"use client";

import React from "react";
import { Globe, Github } from "lucide-react";
import { DateSeparator } from "@/components/chat/date-separator";
import {
    MessageBubble,
    MessageImage,
    MessageImageContent,
    MessageHeading,
    MessageText,
    MessageBadges,
    MessageInlineActions,
    MessageLabel
} from "@/components/chat/message-bubble";
import { FEATURED_PROJECTS, OTHER_PROJECTS, type ProjectData } from "@/lib/site-data";

function ProjectBubble({ project }: { project: ProjectData }) {
    const actions = [];
    if (project.liveUrl) {
        actions.push({
            label: "Live Demo",
            icon: <Globe className="w-3.5 h-3.5" />,
            href: project.liveUrl,
        });
    }
    if (project.githubUrl) {
        actions.push({
            label: "GitHub",
            icon: <Github className="w-3.5 h-3.5" />,
            href: project.githubUrl,
        });
    }

    return (
        <MessageBubble noPadding>
            <MessageImage
                src={project.image}
                alt={project.title}
                gradient={project.gradient}
            />
            <MessageImageContent>
                {project.label && <MessageLabel>{project.label}</MessageLabel>}
                <MessageHeading>{project.title}</MessageHeading>
                <MessageText>{project.description}</MessageText>
                <MessageBadges badges={project.badges} />
                {actions.length > 0 && <MessageInlineActions actions={actions} />}
            </MessageImageContent>
        </MessageBubble>
    );
}

export function ProjectsView() {
    return (
        <>
            <DateSeparator>Featured Projects</DateSeparator>

            {FEATURED_PROJECTS.map((project) => (
                <ProjectBubble key={project.title} project={project} />
            ))}

            <DateSeparator>Other Work</DateSeparator>

            {OTHER_PROJECTS.map((project) => (
                <ProjectBubble key={project.title} project={project} />
            ))}
        </>
    );
}
