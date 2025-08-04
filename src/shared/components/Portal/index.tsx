/**
 * Portal Component
 * Creates a React portal for rendering content outside the normal DOM hierarchy
 * Useful for modals, tooltips, and other overlays that need to break out of parent containers
 *
 * Features:
 * - Automatically creates portal container if it doesn't exist
 * - Cleans up container on unmount if it was created by this component
 * - Reuses existing portal container if available
 */

import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  // Reference to the portal container DOM element
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Try to find existing portal container
    let existingContainer = document.getElementById(
      "portal-root"
    ) as HTMLDivElement;
    containerRef.current = existingContainer || document.createElement("div");
    containerRef.current.id = "portal-root";

    if (!existingContainer) {
      document.body.appendChild(containerRef.current);
    }
    return () => {
      if (!existingContainer && containerRef.current?.parentElement) {
        containerRef.current.parentElement?.removeChild(containerRef.current);
      }
    };
  }, []);

  return containerRef.current
    ? createPortal(children, containerRef.current)
    : null;
};
