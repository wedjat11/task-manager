import { PointerSensor } from "@dnd-kit/core";

function isInteractiveElement(element) {
  const interactiveElements = [
    "button",
    "input",
    "textarea",
    "select",
    "option",
    "a",
    "label",
  ];

  const tagName = element.tagName.toLowerCase();

  if (interactiveElements.includes(tagName)) {
    return true;
  }

  if (element.contentEditable === "true") {
    return true;
  }

  if (element.closest("[data-no-drag]")) {
    return true;
  }

  return false;
}

export class CustomPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown",
      handler: ({ nativeEvent: event }) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

export class CustomTouchSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onTouchStart",
      handler: ({ nativeEvent: event }) => {
        if (!event.isPrimary || isInteractiveElement(event.target)) {
          return false;
        }

        return true;
      },
    },
  ];
}
