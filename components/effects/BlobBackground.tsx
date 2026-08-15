export default function BlobBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="blob-1 absolute w-[600px] h-[600px] top-[-10%] right-[-5%]" />
      <div className="blob-2 absolute w-[500px] h-[500px] bottom-[10%] left-[-5%]" />
    </div>
  );
}
