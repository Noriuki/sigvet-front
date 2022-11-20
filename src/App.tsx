import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./App.css";
import Routes from "./Routes";
import { AppProvider } from "./Services/Contexts/AppContext";
import { AppointmentProvider } from "./Services/Contexts/AppointmentContext";
import { PetProvider } from "./Services/Contexts/PetContext";
import { VeterinaryClinicProvider } from "./Services/Contexts/VeterinaryClinicContext";
import theme from "./Services/Theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppProvider>
          <VeterinaryClinicProvider>
            <PetProvider>
              <AppointmentProvider>
                <div className="App">
                  <Routes />
                </div>
              </AppointmentProvider>
            </PetProvider>
          </VeterinaryClinicProvider>
        </AppProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
