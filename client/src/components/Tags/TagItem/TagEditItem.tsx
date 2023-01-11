import axios from "axios";
import { useCookies } from "react-cookie";
export function TagEditItem(props: any) {
  const [cookies, setCookie, removeCookie] = useCookies(["logCookie"]);
  // Todo : 태그 삭제 기능
  const tagEditHandler = async () => {
    console.log(props.tagId, props.feedId);
    const host_url = `${process.env.REACT_APP_HOST}/api/tag/delete`;
    // 서버에 태그 삭제 요청
    await axios.delete(host_url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.logCookie}`,
      },
      data: {
        tag_id: props.tagId,
        feed_id: props.feedId,
      },
    });
  };
  return (
    <span className="inline-flex items-center mr-2 px-3 py-0.5 rounded-full text-sm font-medium bg-sky-100 text-sky-800 hover:bg-sky-300">
      #{props.tagName}
      <button onClick={tagEditHandler}>
        <svg
          className="w-4 h-4 ml-2 text-black "
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </span>
  );
}
