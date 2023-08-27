import { Link } from "react-router-dom";

/**
 * Home
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function Home() {
  return (
    <>
      <div>
        <Link to="/game">ゲーム開始</Link>
      </div>
      <div>
        <Link to="/login">ログイン</Link>
      </div>
      {/* ログインしたらログインリンクを消して、対戦スコアを表示する */}
    </>
  );
}