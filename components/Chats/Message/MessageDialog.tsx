"use client";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import ForwardMessage from "./ForwardMessage";
import DeleteMessage from "./DeleteMessage";
import EditMessage from "./EditMessage";
import { MouseEvent } from "react";

export function MessageDialog() {
    const handleContextMenuItemClick = (e: MouseEvent) => {
        // Prevent event propagation to parent elements
        e.stopPropagation();
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-full w-full cursor-default items-center">
                {/* Trigger area */}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem inset onClick={handleContextMenuItemClick}>
                    <EditMessage />
                </ContextMenuItem>
                <ContextMenuItem inset onClick={handleContextMenuItemClick}>
                    <DeleteMessage />
                </ContextMenuItem>
                <ContextMenuItem inset onClick={handleContextMenuItemClick}>
                    <ForwardMessage />
                </ContextMenuItem>
                <ContextMenuItem inset onClick={handleContextMenuItemClick}>Pin</ContextMenuItem>
                <ContextMenuItem inset onClick={handleContextMenuItemClick}>Reply</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
