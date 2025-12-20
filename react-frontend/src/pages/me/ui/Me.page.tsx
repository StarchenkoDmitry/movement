import { MainHeader } from "@shared/ui/headers";
import { useEffect, useState } from "react";

export function MePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user", data);
        setUser(data);
      });
  }, []);

  return (
    <div>
      <MainHeader />
      <h1>Me Page</h1>
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
