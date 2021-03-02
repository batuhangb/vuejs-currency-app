import Currency from "./components/Currency";
import Rates from "./components/Rates";

export const routes = [
  { path : "/", component : Currency},
  { path : "/currency-rates", component : Rates},
  { path : "*", redirect : "/"}
]