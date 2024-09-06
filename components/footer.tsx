import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex justify-center py-4 md:py-8 h-[80px] border-t  md:ms-[224px]">
      <div className="text-sm  mr-4 flex flex-col items-center md:flex-row">
        <span className="hidden md:block">
          Event App &copy; {new Date().getFullYear()} |
        </span>
        <span className="italic mx-1">
          by <Link href="https://github.com/klisiubb/">Mateusz Kliś</Link>
        </span>
      </div>
    </div>
  );
};
