import Loader from "@/componets/Loader";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <Loader />
    </div>
  );
}
