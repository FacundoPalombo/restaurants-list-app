import UserNav from "../components/UserNav";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="p-4">
      <UserNav />
      <section>{children}</section>
    </main>
  );
}
