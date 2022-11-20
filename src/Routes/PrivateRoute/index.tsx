import jwtDecoder from "jwt-decode";
import React, { useLayoutEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrentUser, logout } from "../../Services/Auth";
import { ROLE } from "../../Services/Types";
interface Props {
  component: React.ComponentType;
  roles: Array<ROLE>;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  roles,
}) => {
  const validateUser = () => {
    let user = getCurrentUser();
    if (user) {
      let decodedToken: {
        exp: number;
        fullName: string;
        iat: number;
        id: number;
        role: ROLE;
      } = jwtDecoder(user?.token as string);

      const dateNow = new Date();

      if (decodedToken?.exp * 1000 < dateNow.getTime()) {
        logout();
      } else {
        return roles.includes(ROLE[`${user.role}` as keyof typeof ROLE])
          ? true
          : false;
      }
    } else {
      <Navigate to="/login" />;
    }
  };

  const NewRoute = () => {
    const valid = validateUser();
    if (!!valid) {
      return <RouteComponent />;
    } else {
      Swal.fire({
        title: "Acesso bloqueado!",
        text: "Você não tem permissão para acessar essa funcionalidade.",
        icon: "error",
        backdrop: "rgba(0,0,0,1)",
      }).then((v) => window.location.reload());
      return <Navigate to="/" />;
    }
  };

  return <NewRoute />;
};
