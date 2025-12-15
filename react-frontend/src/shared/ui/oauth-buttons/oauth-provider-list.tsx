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
          window.location.assign(
            "https://github.com/login/oauth/authorize2?scope=user:email&client_id=Ov23li8LexNQgXy0wWo5"
          );
        }}
      />
    </div>
  );
}
