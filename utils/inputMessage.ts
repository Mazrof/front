export function checkClickOutside(event: MouseEvent, element: HTMLDivElement | null) {
    return element && !element.contains(event.target as Node);
}
