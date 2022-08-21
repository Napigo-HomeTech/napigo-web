import React, {
  Children,
  ReactNode,
  useRef,
  useState,
  isValidElement,
  cloneElement,
  useEffect,
  useCallback,
} from "react";

type ArrowNavManagerProps = {
  children: ReactNode[];
  active: boolean;
  id: string;
};
export const ArrowNavManager: React.FC<ArrowNavManagerProps> = (props) => {
  const { children, active, id } = props;

  const [cursor, setCursor] = useState<number>(-1);
  const items = useRef<HTMLElement[]>([]);

  const bodyId = id.concat("arrownavmanager");

  const onKeyDown = useCallback(
    (e: any) => {
      let newCursor = 0;
      let lastIndex = children.length - 1;
      if (cursor !== -1 && (e.key === " " || e.key === "Enter")) {
        const currentNode = items.current[cursor];
        e.preventDefault();
        currentNode?.click();
        setCursor(-1);
        return;
      }
      if (e.key === "ArrowDown") {
        if ((cursor < 0 && cursor > lastIndex) || cursor === lastIndex) {
          newCursor = 0;
        } else {
          newCursor = cursor + 1;
        }
      } else if (e.key === "ArrowUp") {
        if (cursor < 0 || cursor === 0) {
          newCursor = lastIndex;
        } else {
          newCursor = cursor - 1;
        }
      }

      setCursor(newCursor);
      const node = items.current[newCursor];
      node?.focus();
    },
    [children.length, cursor]
  );

  useEffect(() => {
    if (active) {
      document.getElementById(bodyId)?.focus();
    }
  }, [active, bodyId]);

  return (
    <div
      id={bodyId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="focus:outline-none"
    >
      {Children.map(children, (child: ReactNode, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ref: (n: HTMLElement) => {
              items.current[index] = n;
            },
            role: "menuitem",
          });
        }
      })}
    </div>
  );
};
