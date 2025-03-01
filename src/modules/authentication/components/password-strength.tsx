import { useEffect, useState } from "react";

interface IProps {
  password: string;
}

interface IStrengthChecks {
  length: boolean;
  letter: boolean;
  number: boolean;
  special: boolean;
}

export default function AuthenticationPasswordStrength(props: IProps) {
  const { password } = props;

  const [checks, setChecks] = useState<IStrengthChecks>({
    length: false,
    letter: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setChecks({
      length: password.length >= 8,
      letter: /[a-zA-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*#?&]/.test(password),
    });
  }, [password]);

  return (
    <article className="text-sm mt-2">
      <p>A senha deve conter:</p>
      <ul className="list-disc pl-5">
        <li className={checks.length ? "text-green-400" : "text-red-400"}>
          Pelo menos 8 caracteres
        </li>
        <li className={checks.letter ? "text-green-400" : "text-red-400"}>
          Pelo menos uma letra
        </li>
        <li className={checks.number ? "text-green-400" : "text-red-400"}>
          Pelo menos um número
        </li>
        <li className={checks.special ? "text-green-400" : "text-red-400"}>
          Pelo menos um caractere especial (@$!%*#?&)
        </li>
      </ul>
    </article>
  );
}
