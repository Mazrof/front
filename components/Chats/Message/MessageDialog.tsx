"use client";
import { ContextMenuItem } from "@/components/ui/context-menu";
import ForwardMessage from "./ForwardMessage";
import DeleteMessage from "./DeleteMessage";
import EditMessage from "./EditMessage";
export function MessageDialog() {
    return (
        <>
            <ContextMenuItem inset>
                <EditMessage />
            </ContextMenuItem>
            <ContextMenuItem inset>
                <DeleteMessage />
            </ContextMenuItem>
            <ContextMenuItem inset>
                <ForwardMessage />
            </ContextMenuItem>
            <ContextMenuItem inset>Pin </ContextMenuItem>
            <ContextMenuItem inset>Reply </ContextMenuItem>
        </>
    );
}
