import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface InvitationProps {
  title: string;
  subtitle: string;
  linkTo: string;
}

export function Invitation({ title, subtitle, linkTo }: InvitationProps) {
  return (
    <Link to={linkTo}>
      <div className="mt-20 bg-slate-700 rounded-md p-5 relative hover:bg-opacity-80 transition-colors">
        <div className="absolute right-5 translate-y-[-50%] top-[50%]">
          <ChevronRightIcon />
        </div>
        <p>{title}</p>
        <p className="text-emerald-500">{subtitle}</p>
      </div>
    </Link>
  );
}
