import UserNav from "../components/UserNav";
import { verifySession } from "../services/auth";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  //? En el mundo normal, llamar en el layout todo el tiempo a verificar sesion y en los middlewares tambien es mala practica, se duplican las llamadas.
  //? Con la nueva especificacion de server components y el cache handshake automatico que hace next, next enforza a ejecutar las llamadas en los server components y cachea las respuestas.
  const sessionVerified = await verifySession();

  return (
    <div className="flex flex-col gap-4 p-4 h-full w-full">
      <UserNav username={sessionVerified?.payload?.name} />
      {children}
    </div>
  );
}
