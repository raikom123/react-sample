import { Link } from "react-router-dom";

/**
 * NotFound : 存在しないURLにアクセスした際のページ
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function NotFound () {
  return (
    <>
      <h1>お探しのページは見つかりませんでした。</h1>
      <div>
        <Link to={`/`}>ホームに戻る</Link>
      </div>
    </>
  );
}