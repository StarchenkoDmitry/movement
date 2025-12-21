import React from "react";
import { useUserControllerUpdateNameV1 } from "../../../orval/user";

export function UpdateUserName() {
  const { data, mutate } = useUserControllerUpdateNameV1();
  console.log("[UpdateUserName] data", data);

  const changeName = async () => {
    console.log("[UpdateUserName] *changeName");
    mutate({
      data: {
        firstName: `Random ${Math.floor(Math.random() * 100000)}`,
      },
    });
  };

  return (
    <div>
      <div className="border-2">
        <h3>Mutation</h3>
        <button onClick={changeName}>Update name</button>
      </div>
    </div>
  );
}
