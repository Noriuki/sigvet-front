import { format } from "date-fns";

export const formatPetAge = (age: number): string => {
  let stringAge = "";
  if (age >= 1) {
    stringAge = age >= 2 ? `ANOS` : `ANO`;
  } else if (age < 1) {
    stringAge = age >= 0.2 ? `MESES` : `MÊS`;
  }

  return stringAge;
};

export const formatDate = (date: string): string => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

export const formatCurrency = (currency: number) => {
  const options = {
    style: "currency",
    currency: "BRL",
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return new Intl.NumberFormat("pt-BR", options).format(currency);
};
