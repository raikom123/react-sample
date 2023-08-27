import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Login
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /**
   * ユーザ認証を行う
   */
  function authorize() {
    if (!username || password) {
      // ユーザ名とパスワードを両方とも入力していない場合は認証しない
      return;
    }
    // TODO 認証処理を行う
    navigate("/"); // ホーム画面に遷移する
  }

  return (
    <>
      <div>
        <label>username:<input type={"text"} value={username} onChange={(e) => setUsername(e.target.value)}/></label>
      </div>
      <div>
        <label>password:<input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      </div>
      <div>
        <button onClick={() => authorize()}>ログイン</button>
        <Link to="/">戻る</Link>
      </div>
    </>
  );
}