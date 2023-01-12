import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import {
  AcademicCapIcon,
  ArrowRightCircleIcon,
  ChatBubbleBottomCenterIcon,
  ChevronRightIcon,
  ForwardIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Comment } from "../../Comment/Comment";
import { TagEdit } from "../../Tags/TagEdit";
import { TagItem } from "../../Tags/TagItem/TagItem";
import { currentFeedIdState, tagModalVisble } from "../../../states/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
const FeedItem = (props: any) => {
  const [commentIsClicked, setCommentIsClicked] = useState(false);
  const setCurrentFeedId = useSetRecoilState(currentFeedIdState);
  const tagModal = useRecoilValue(tagModalVisble);

  // 여러개의 하이라이트를 받아서 하나의 리스트로 만들어준다.
  // 하이라이트별 색상 지정해줘야함. -> 수정해야함
  let font_color = "bg-purple-200";
  // 날짜 파싱
  const date = new Date(props.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 하이라이트 파싱
  const highlights = props.highlight.map((hl: any, index: number) => (
    <li className="" key={index}>
      <span className={font_color}>{hl.contents}</span>
    </li>
  ));

  // 태그 파싱
  const tags = props.tag.map((tagItem: any, index: number) => (
    <li key={index}>
      <TagItem name={tagItem.tag_name} tag_id={tagItem.id}></TagItem>
    </li>
  ));

  function commentToggleHandler() {
    if (!commentIsClicked) {
      setCurrentFeedId(props.id);
    }
    setCommentIsClicked(!commentIsClicked);
  }
  // useEffect(() => {
  //   console.log("FeedItem.tsx");
  // }, [tagModal]);
  return (
    // <li className="py-5">
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="flex flex-row items-center px-3 mt-3 text-sm text-gray-500 ">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 "
            aria-hidden="true"
          />
          {`${month}월 ${day}일, ${year}년 `}
        </div>
        <div className="flex flex-row items-center px-3 mt-3 mr-1 text-sm text-gray-500 ">
          <div className="text-xs">{props.writer}</div>
          <div>
            <img
              className="object-cover w-5 h-5 ml-1"
              src={props.writerImg}
              alt="Flower and sky"
            />
          </div>
        </div>
      </div>
      <div className="m-5 sm:px-6">
        <a href={props.url} target="_blank" rel="noreferrer">
          <h2 className="mb-5 text-xl font-bold leading-6 text-gray-900 hover:text-gray-600">
            {props.title}
          </h2>
        </a>

        <div className="mb-5 ">
          <ul className="space-y-1.5">{highlights}</ul>
        </div>

        {/* 노션 북마크처럼 만들기 프로젝트 */}
        <div className="max-w-lg mb-3 overflow-hidden rounded-lg shadow-lg w-50 sm:flex">
          <div className="w-full sm:w-1/3">
            <img
              className="object-cover w-full h-48"
              src={props.og_image}
              alt="Flower and sky"
            />
          </div>
          <div className="flex-1 px-6 py-4">
            <h4 className="mb-3 text-lg font-semibold tracking-tight text-gray-800">
              {props.title}
            </h4>
            <p className="text-xs leading-normal text-gray-700">
              {props.description}
            </p>
          </div>
        </div>
        {/* 태그 */}
        {/* 태그 추가 버튼 */}
        <div className="flex flex-wrap mt-2">{tags}</div>

        {/* 댓글 기능 */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500 ">
          <TagEdit
            // key={props.key}
            tag={props.tag}
            feed_id={props.id}
          ></TagEdit>
          {/* 즐겨찾기 */}
          {/* <div>
              <CheckIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 hover:text-sky-500"
                aria-hidden="true"
              />
            </div>
            즐겨찾기
            {/* 댓글 버튼 (토글식)*/}
          <div>
            <span className="mr-2 ">{props.commentLen}</span>
            <button onClick={commentToggleHandler} className="">
              {/* <button className=""> */}
              <ChatBubbleBottomCenterIcon className="w-5 h-5 text-gray-400 hover:text-gray-700" />
              {/* </button> */}
              {/* ChevronDownIcon 클릭시 댓글창  */}
              {/* */}
            </button>
          </div>
        </div>
        {/* 숨김 코멘트창 */}
        {commentIsClicked && <Comment></Comment>}
      </div>
    </div>
    // </li>
  );
};

export default FeedItem;
