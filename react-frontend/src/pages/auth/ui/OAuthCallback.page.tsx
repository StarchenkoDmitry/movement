import { MainHeader } from "@shared/ui/headers";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

//auth/oauth/github?code=657456745678TJDRTY

export function OAuthCallbackPage() {
  const { provider } = useParams<{ provider: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  useEffect(() => {
    const handleCallback = async () => {
      if (!code) {
        navigate("/auth");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/auth/oauth/callback/${provider}?code=${code}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        // navigate("/");
      } else {
        // navigate("/");
      }
    };

    handleCallback();
  }, [provider, location, navigate]);

  return (
    <div>
      <MainHeader />
      <h1>oauth callback page</h1>
      <h3>Provider: {provider}</h3>
      <h3>Code: {code}</h3>
    </div>
  );
}
