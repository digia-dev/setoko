type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-[#FF4D9E] text-white hover:bg-[#E03686] shadow-lg shadow-pink-200'
      : 'border border-[#0B2948] text-[#0B2948] hover:bg-slate-50';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
