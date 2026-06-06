import { redirect } from "next/navigation";

/** Legacy hub path — canonical directory lives at /uk-calculator-directory */
export default function UKSalaryHubRedirect() {
  redirect("/uk-calculator-directory");
}
