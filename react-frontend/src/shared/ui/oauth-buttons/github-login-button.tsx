import { GithubLoginButton as ThirdGithubLoginButton } from "react-social-login-buttons";

interface GithubLoginButtonProps {
  onClick?: () => void;
}

export function GithubLoginButton({ onClick }: GithubLoginButtonProps) {
  return (
    <ThirdGithubLoginButton
      className="m-0 bob"
      style={{
        margin: 0,
        fontSize: 16,
        width: "100%",
      }}
      onClick={onClick}
    >
      Sign In With GitHub
    </ThirdGithubLoginButton>
  );
}
