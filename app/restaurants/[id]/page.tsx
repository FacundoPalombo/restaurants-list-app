export default async function Page({ params }) {
  const { id } = params;
  return <>Hello Restaurant detail{id}</>;
}
