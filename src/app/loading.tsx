

export default function Loading() {
  return (
    <div className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
      <div className="text-white font-semibold">Loading....</div>
      <div className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]" />
    </div>
  );
}   