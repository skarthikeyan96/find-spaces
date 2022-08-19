import Link from "next/link";
import { useRouter } from "next/router";

interface Layout {
  children: any;
}

const Layout = ({ children }: Layout) => {
  const router = useRouter();

  return (
    <div className="flex flex-col p-8">
      <nav className="w-full max-w-3xl flex mx-auto justify-between">
        <Link href="/">
          <a
            className={
              router.pathname === "/"
                ? "font-bold   md:inline-block p-1 sm:px-3 sm:py-2  transition-all"
                : "font-normal   md:inline-block p-1 sm:px-3 sm:py-2  transition-all"
            }
          >
            Home
          </a>
        </Link>

        <div>
          <a
            className="font-bold   md:inline-block p-1 sm:px-3 sm:py-2  transition-all"
            href="https://twitter.com/karthik_coder"
            target="_blank"
          >
            Twitter
          </a>

          <a
            className="font-bold   md:inline-block p-1 sm:px-3 sm:py-2  transition-all"
            href="https://github.com/skarthikeyan96/skarthikeyan96"
            target="_blank"
          >
            Github
          </a>
        </div>
      </nav>

      <main className="flex flex-col  px-4 mt-16">
        <div className="flex flex-col items-center max-w-3xl mx-auto pb-16">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
