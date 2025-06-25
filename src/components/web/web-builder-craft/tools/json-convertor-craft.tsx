

// Utility to convert Craft JSON to JSX (must have resolver map)
export const renderCraftJsonToJsx = (json: any, resolvers: Record<string, React.ElementType>) => {
  const renderNode = (id: string) => {
    const node = json[id];
    const { type, props, nodes, linkedNodes } = node;
    const Component = resolvers[node.displayName || type.resolvedName];

    if (!Component) return null;

    return (
      <Component key={id} {...props}>
        {nodes?.map(renderNode)}
        {linkedNodes &&
          Object.values(linkedNodes).map((linkedId: any) => renderNode(linkedId))}
      </Component>
    );
  };

  return renderNode("ROOT");
};
