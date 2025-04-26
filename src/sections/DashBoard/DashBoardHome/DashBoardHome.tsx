"use client";

import { Button } from "@/components/ui/button";
import AuthServices from "@/services/auth.service";
import React from "react";

export default function DashBoardHome() {
  const { handleLogout } = AuthServices.useAuth();

  return (
    <div>
      DashBoardHome
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </Button>
    </div>
  );
}
