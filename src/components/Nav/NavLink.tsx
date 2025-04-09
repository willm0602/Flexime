import Link from "next/link";

interface NavLinkProps {
    route: string;
    children: React.ReactNode;
}

export default function NavLink({ route, children }: NavLinkProps) {
    return <Link href={route}>{children}</Link>;
}
