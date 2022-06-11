//* modelo preliminar de usuario del sistema para uso de los servicios
//* de autenticacion

export interface User {
  id: number;
  firstname: string;
  email: string;
  accessToken: string;
  tokenType: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  //...otros datos
}
