interface IAuthenticationPageNavProps {
  title: string;
  subtitle: string;
}
export default function AuthenticationPageNav(
  props: IAuthenticationPageNavProps
) {
  return (
    <nav className="grid gap-2 text-center mb-6">
      <figure className="w-full flex items-center justify-center">
        <img
          src="/logo.svg"
          alt="Deal Engine"
          className="h-12 object-contain"
        />
      </figure>

      <h4 className="text-center font-semibold">{props.title}</h4>
      <p className="text-center text-sm">{props.subtitle}</p>
    </nav>
  );
}
