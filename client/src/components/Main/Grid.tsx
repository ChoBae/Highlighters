import GridSkeleton from "../UI/GridSkeleton";
import Gallery from "./Gallery";
import { Suspense, lazy } from "react";
import { changeMainSectionState } from "../../states/atom";
import { useRecoilState } from "recoil";
// const Gallery = lazy(() => import("./Gallery"));
export function Grid() {
  const [changeMainSection, setChangeMainSection] = useRecoilState(
    changeMainSectionState
  );
  const clickedMainChange = () => {
    setChangeMainSection(!changeMainSection);
  };

  return (
    // 사진첩 만들기
    <div className="box-border w-full h-full gap-3 p-5 xl:overflow-hidden xl:px-16 xl:flex-row xl:flex ">
      {/* 사진 갤러리 만들기 */}
      <div className="w-full bg-white rounded-lg shadow-md">
        <Gallery></Gallery>
      </div>
      <svg
        onClick={clickedMainChange}
        className="absolute p-1 text-gray-400 transition duration-150 ease-in-out rounded-full cursor-pointer w-9 h-9 right-20 top-24 hover:bg-gray-100 hover:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </div>
  );
}
