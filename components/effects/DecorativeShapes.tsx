export default function DecorativeShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="deco-circle top-[15%] left-[8%]" />
      <div className="deco-ring top-[25%] right-[12%]" />
      <div className="deco-circle bottom-[20%] right-[20%] !bg-plum" />
      <div className="deco-ring bottom-[30%] left-[15%]" />
      <div className="deco-circle top-[60%] left-[45%] !bg-gold !opacity-10" />
    </div>
  );
}
