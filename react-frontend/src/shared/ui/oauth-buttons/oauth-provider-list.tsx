import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

export function OAuthProvidersList() {
  return (
    <div className="space-y-3">
      <GoogleLoginButton
        style={{
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px",
        }}
      />
      <FacebookLoginButton
        style={{
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px",
        }}
      />
      <GithubLoginButton
        style={{
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px",
        }}
        onClick={() => {
          const url =
            "https://github.com/login/oauth/authorize?scope=user:email&client_id=Ov23li8LexNQgXy0wWo5";
          window.open(url);
        }}
      />
    </div>
  );
}
