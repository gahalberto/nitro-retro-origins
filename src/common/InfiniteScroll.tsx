import { useVirtualizer } from "@tanstack/react-virtual";
import { FC, Fragment, ReactElement, useEffect, useRef, useState } from "react";
import { Base } from "./Base";

interface InfiniteScrollProps<T = any> {
  rows: T[];
  overscan?: number;
  scrollToBottom?: boolean;
  rowRender: (row: T) => ReactElement;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = (props) => {
  const {
    rows = [],
    overscan = 5,
    scrollToBottom = false,
    rowRender = null,
  } = props;
  const [scrollIndex, setScrollIndex] = useState<number>(rows.length - 1);
  const elementRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    getScrollElement: () => elementRef.current,
    count: rows.length,
    estimateSize: () => 35,
    overscan,
  });

  const items = virtualizer.getVirtualItems();
  const paddingTop = items.length > 0 ? items[0]?.start || 0 : 0;
  const paddingBottom =
    items.length > 0
      ? virtualizer.getTotalSize() - (items[items.length - 1]?.end || 0)
      : 0;

  useEffect(() => {
    if (!scrollToBottom) return;

    virtualizer.scrollToIndex(scrollIndex);
  }, [scrollToBottom, scrollIndex, virtualizer]);

  return (
    <Base fit innerRef={elementRef} position="relative" overflow="auto">
      {paddingTop > 0 && <div style={{ minHeight: `${paddingTop}px` }} />}
      {items.map((item) => {
        const row = rows[item.index];

        if (!row) return <Fragment key={item.key} />;

        return (
          <div
            key={item.key}
            data-index={item.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${item.size}px`,
              transform: `translateY(${item.start}px)`,
            }}
          >
            {rowRender(row)}
          </div>
        );
      })}
      {paddingBottom > 0 && <div style={{ minHeight: `${paddingBottom}px` }} />}
    </Base>
  );
};
