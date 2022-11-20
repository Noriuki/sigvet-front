import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Appointment from "../Pages/Appointment";
import AppointmentInfo from "../Pages/AppointmentInfo";
import AppointmentService from "../Pages/AppointmentService";
import AppointmentServiceInfo from "../Pages/AppointmentServiceInfo";
import ClinicFinance from "../Pages/ClinicFinance";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Pet from "../Pages/Pet";
import PetInfo from "../Pages/PetInfo";
import PetOwner from "../Pages/PetOwner";
import PetOwnerInfo from "../Pages/PetOwnerInfo";
import ServiceType from "../Pages/ServiceType";
import ServiceTypeInfo from "../Pages/ServiceTypeInfo";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import UserConfiguration from "../Pages/UserConfiguration";
import UserManagementInfo from "../Pages/UserConfiguration/UserManagementInfo";
import { ROLE } from "../Services/Types";
import { PrivateRoute } from "./PrivateRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <Home />}
            />
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route
          path="/animais"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <Pet />}
            />
          }
        />
        <Route
          path="/animais/:id"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <PetInfo />}
            />
          }
        />
        <Route
          path="/animais/registrar"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <PetInfo />}
            />
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <PetOwner />}
            />
          }
        />
        <Route
          path="/clientes/:id"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <PetOwnerInfo />}
            />
          }
        />
        <Route
          path="/clientes/registrar"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <PetOwnerInfo />}
            />
          }
        />

        <Route
          path="/consultas"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <Appointment />}
            />
          }
        />
        <Route
          path="/consultas/:id"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <AppointmentInfo />}
            />
          }
        />
        <Route
          path="/consultas/registrar"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <AppointmentInfo />}
            />
          }
        />

        <Route
          path="/servicos"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"]]}
              component={() => <AppointmentService />}
            />
          }
        />
        <Route
          path="/servicos/registrar/:id"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"]]}
              component={() => <AppointmentServiceInfo />}
            />
          }
        />
        <Route
          path="/servicos/:id"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"]]}
              component={() => <AppointmentServiceInfo />}
            />
          }
        />

        <Route
          path="/tipo-servico"
          element={
            <PrivateRoute
              roles={[ROLE["admin"]]}
              component={() => <ServiceType />}
            />
          }
        />
        <Route
          path="/tipo-servico/:id"
          element={
            <PrivateRoute
              roles={[ROLE["admin"]]}
              component={() => <ServiceTypeInfo />}
            />
          }
        />
        <Route
          path="/tipo-servico/registrar"
          element={
            <PrivateRoute
              roles={[ROLE["admin"]]}
              component={() => <ServiceTypeInfo />}
            />
          }
        />

        <Route
          path="/servicos/registrar"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <AppointmentServiceInfo />}
            />
          }
        />

        <Route
          path="/configuracoes"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <UserConfiguration />}
            />
          }
        />

        <Route
          path="/financeiro"
          element={
            <PrivateRoute
              roles={[ROLE["admin"]]}
              component={() => <ClinicFinance />}
            />
          }
        />

        <Route
          path="/usuarios/:id"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <UserManagementInfo />}
            />
          }
        />
        <Route
          path="/usuarios/registrar"
          element={
            <PrivateRoute
              roles={[ROLE["admin"], ROLE["doctor"], ROLE["receptionist"]]}
              component={() => <UserManagementInfo />}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}
