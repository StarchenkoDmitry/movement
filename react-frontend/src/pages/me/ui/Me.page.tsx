import { MainHeader } from "@shared/ui/headers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { User } from "../../../orval/movement.schemas";
import { getUserControllerMeV1QueryKey, userControllerMeV1 } from "../../../orval/user";

export function MePage() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState<any>(null);

  const {
    isLoading,
    data: user,
    isRefetching,
  } = useQuery<{
    firstName: string;
  }>({
    initialData: {
      // id: "",
      // firstName: "",
      // email: "",
      // createdAt: new Date(),
      // updatedAt: new Date(),
      // credential: {
      //   id: "",
      //   type: "",
      //   email: "",
      //   passwordHash: "",
      //   phone: "",
      //   provider: "",
      //   providerId: 0,
      //   profile: {},
      //   access: {},
      //   accessToken: "",
      //   refreshToken: "",
      //   tokenExpiry: new Date(),
      // },
      // sessions: [],

      firstName: "first initial data",
    },
    // queryKey: getUserControllerMeV1QueryKey(),
    queryKey: ["me"],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log("fetch me"); 
      return {
        firstName: `first test ${Math.floor(Math.random() * 100000)}`,
      };
      // const user = await getUser();
      // return {
      //   firstName: user.,
      // };save
    },
  });

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/v1/user/me", {
  //     credentials: "include",
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return null;
  //     })
  //     .then((data) => {
  //       console.log("user", data);
  //       setUser(data);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <div>
      <MainHeader />
      <h1>Me Page</h1>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      <div>isRefetching: {isRefetching ? "true" : "false"}</div>
      <div>
        {user ? (
          <>
            {/* <div>id: {user.id}</div> */}
            <div>firstName: {user.firstName}</div>
            {/* <div>email: {user.email}</div> */}
            {/* <div>createdAt: {user.createdAt}</div> */}
            {/* <div>updatedAt: {user.updatedAt}</div> */}
          </>
        ) : (
          "No user"
        )}
      </div>
      <footer></footer>
    </div>
  );
}
