export function VerticalSpacer({ height }) {
  const spacerStyle = {
    width: "100%",
    height: `${height}px`,
  };
  return <div style={spacerStyle}></div>;
}
