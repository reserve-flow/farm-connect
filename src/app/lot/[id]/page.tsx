import LotDetail from "@/pages/LotDetail";

type Params = { params: Promise<{ id: string }> };


export default async function Page({ params }: Params) {
    const { id } = await params;
    return <LotDetail id={id} />;
}