import EarIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/ear.tsx";

type Props = {
  active: string;
  loggedIn: boolean;
};

export default function Header({ active, loggedIn }: Props) {
  const menus = [
    { name: "Home", href: "/" },
    {
      name: loggedIn ? "Logout" : "Login",
      href: loggedIn ? "/logout" : "/login",
    },
  ];

  return (
    <div class="bg-white w-full max-w-screen-lg py-6 px-8 flex flex-col md:flex-row gap-4">
      <div class="flex items-center flex-1">
        <EarIcon />
        <div class="text-2xl  ml-1 font-bold">Music PM</div>
      </div>
      <ul class="flex items-center gap-6">
        {menus.map((menu) => (
          <li>
            <a
              href={menu.href}
              class={
                "text-gray-500 hover:text-gray-700 py-1 border-gray-500" +
                (menu.href === active ? " font-bold border-b-2" : "")
              }
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
