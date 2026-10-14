import Link from 'next/link';

type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  tag: string;
};

export default function ProductCard({ id, name, price, tag }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
      <div className="h-48 bg-gradient-to-br from-[#0B2948]/10 via-white to-[#FF4D9E]/10" />
      <div className="p-4">
        <span className="inline-flex rounded-full bg-[#FF4D9E]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E03686]">
          {tag}
        </span>
        <h3 className="mt-3 text-lg font-bold text-[#0B2948]">{name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-base font-bold text-[#0B2948]">{price}</p>
          <Link href={`/public/baju-jemari/${id}`}>
            <a className="rounded-lg bg-[#0B2948] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122d50]">
              Detail
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
