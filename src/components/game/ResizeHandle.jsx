import { PanelResizeHandle } from "react-resizable-panels";

export default function ResizeHandle({ direction = "horizontal" }) {
  const isHorizontal = direction === "horizontal";

  return (
    <PanelResizeHandle
      className={`
        group
        ${isHorizontal ? "w-4 cursor-col-resize" : "h-4 cursor-row-resize"}
        flex items-center justify-center
        bg-gray-200 hover:bg-gray-300
        transition-colors
      `}
    >
      <div
        className={`
          flex ${isHorizontal ? "flex-col space-y-1" : "flex-row space-x-1"}
          items-center justify-center
        `}
      >
        <span className="block w-1 h-1 rounded-full bg-gray-500 group-hover:bg-gray-700" />
        <span className="block w-1 h-1 rounded-full bg-gray-500 group-hover:bg-gray-700" />
        <span className="block w-1 h-1 rounded-full bg-gray-500 group-hover:bg-gray-700" />
      </div>
    </PanelResizeHandle>
  );
}
