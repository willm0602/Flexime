interface NavLinkProps {
    route: string;
    children: React.ReactNode;
}

export default function NavLink({ route, children }: NavLinkProps) {
    return <a href={route}>{children}</a>;
}
