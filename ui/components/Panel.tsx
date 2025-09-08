interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "content" | "error";
  gridCols?: number;
  title?: string;
  children: React.ReactNode;
}

const Panel = ({
  className,
  type,
  title,
  gridCols,
  children,
  ...props
}: PanelProps) => {
  if (!type) {
    type = "content";
  }

  if (!className) {
    className = "";
  }

  if (type === "error") {
    className += "h-40 text-red-500";
  }

  if (!gridCols) {
    className += "md:col-span-2 lg:col-span-4";
  } else {
    className += `md:col-span-2 lg:col-span-${gridCols}`;
  }

  return (
    <div
      className={`bg-gray-800 p-4 rounded-xl ${className}`}
      data-cy="panel"
      {...props}
    >
      {title && <h2 className="uppercase text-xs mt-2 mb-4">{title}</h2>}
      <div className="flex-1 p-3 rounded-lg bg-gray-700 text-sm text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default Panel;
