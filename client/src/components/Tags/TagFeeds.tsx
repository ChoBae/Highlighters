import {
  DocumentIcon,
  StarIcon,
  CalendarDaysIcon,
  Squares2X2Icon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import TagsInFeeds from "./TagsInFeeds";
import FeedItem from "../Feeds/FeedItem/FeedItem";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  feedsInGroupState,
  tagsInFeedState,
  clickedTagState,
  userInfoState,
  feedsTagListState,
  changeMainSectionState,
  mainSectionState,
} from "../../states/atom";

const TagFeeds = () => {
  const [mainSectionNum, setMainSectionNum] = useRecoilState(mainSectionState);

  const [changeMainSection, setChangeMainSection] = useRecoilState(
    changeMainSectionState
  );
  const clickedTag = useRecoilValue(clickedTagState);
  const clickedMainChange = () => {
    setChangeMainSection(!changeMainSection);
  };
  const handleBookmarkClick = () => {
    setMainSectionNum(0);
  };
  return (
    <div className="basis-2/4">
      <div className="rounded-md opacity-90 bg-sky-500">
        {/* 메뉴바*/}
        <div className="flex justify-between p-3 rounded-3xl">
          <div>
            <span className="inline-flex shadow-lg items-center mr-2 px-3 py-0.5 rounded-full text-xl font-bold bg-sky-100 text-sky-800">
              # {clickedTag.tag_name}
            </span>
          </div>
          <div className="flex">
            <button
              onClick={handleBookmarkClick}
              className="p-1 text-white bg-sky-500 hover:bg-sky-500 "
            >
              <HomeIcon className="w-6 h-6"></HomeIcon>
            </button>
            <Squares2X2Icon
              onClick={clickedMainChange}
              className="text-white cursor-pointer w-7 h-7 mt-0.5 hover:text-sky-600 hover:scale-95"
            ></Squares2X2Icon>
          </div>
        </div>
      </div>
      <TagsInFeeds></TagsInFeeds>
    </div>
  );
};

export default TagFeeds;
