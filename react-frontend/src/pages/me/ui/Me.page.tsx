import { MainHeader } from "@shared/ui/headers";
import { useEffect, useState } from "react";

export function MePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        console.log("user", data);
        setUser(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <MainHeader />
      <h1>Me Page</h1>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      <div>
        {user ? (
          <>
            <div>id: {user.id}</div>
            <div>firstName: {user.firstName}</div>
            <div>email: {user.email}</div>
            <div>createdAt: {user.createdAt}</div>
            <div>updatedAt: {user.updatedAt}</div>
          </>
        ) : (
          "No user"
        )}
      </div>
      <footer></footer>
    </div>
  );
}
