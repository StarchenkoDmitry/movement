import { MainHeader } from "@shared/ui/headers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { User } from "../../../orval/movement.schemas";
import {
  getUserControllerMeV1QueryKey,
  getUserControllerMeV1QueryOptions,
  userControllerMeV1,
  userControllerUpdateV1,
  useUserControllerMeV1,
} from "../../../orval/user";

export function MePage() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState<any>(null);

  const { isLoading, data: user, isRefetching } = useUserControllerMeV1();
  // const user = data as any;
  console.log("data", user);

  const changeName = async () => {
    const res = await userControllerUpdateV1({
      firstName: `Random ${Math.floor(Math.random() * 100000)}`,
    });
    console.log("res", res);
  };

  return (
    <div>
      <MainHeader />
      <h1>Me Page</h1>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      <div>isRefetching: {isRefetching ? "true" : "false"}</div>
      <div>
        {user ? (
          <>
            <div>id: {user.id}</div>
            <div>firstName: {user.firstName}</div>
            <div>createdAt: {user.createdAt}</div>
            <div>updatedAt: {user.updatedAt}</div>
          </>
        ) : (
          "No user"
        )}
      </div>
      <div>
        <h3>Mutation</h3>
        <button onClick={changeName}>Update name</button>
      </div>
      <footer></footer>
    </div>
  );
}
