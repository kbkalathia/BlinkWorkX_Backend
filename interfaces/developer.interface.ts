export interface NewDeveloperData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "developer";

}