type Props = {
  params: {
    agencyId: string;
  };
};

export default async function Page({ params }: Props) {
  const { agencyId } = await params;
  return (
    <>
      <h1>hello</h1>
      <h2>Meet</h2>
      <h1>Agency ID: {agencyId}</h1>
    </>
  );
}
