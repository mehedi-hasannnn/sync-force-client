import { InfinitySpin } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f8fafc]">
      <InfinitySpin
        width="200"
        color="#1d3557"
        visible={true}
      />
    </div>
  );
}
