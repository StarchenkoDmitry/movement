import { MainHeader } from "@shared/ui/headers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { User } from "../../../orval/movement.schemas";
import {
  getUserControllerMeV1QueryKey,
  getUserControllerMeV1QueryOptions,
  userControllerMeV1,
  useUserControllerMeV1,
} from "../../../orval/user";
import { UpdateUserName } from "./update-user-name";

export function MePage() {
  
  const { isLoading, data: user, isRefetching } = useUserControllerMeV1();
  // const user = data as any;
  console.log("[MePage] user.firstName:", user?.firstName);

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
        <UpdateUserName></UpdateUserName>
      </div>
      <footer></footer>
    </div>
  );
}
