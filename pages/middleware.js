import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";
import { verify } from "jsonwebtoken";

const secret = process.env.SECRET;

export async function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.myTokenName;
  const url = req.url;
  if (url.includes("/users")) {
    if (jwt) {
      try {
        verify(jwt, secret);
        return NextResponse.redirect('/');
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  if (url.includes("/dashboard")) {
    if (jwt === undefined) {
      return NextResponse.redirect("/users");
    }

    try {
      verify(jwt, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect("/users");
    }
  }
  return NextResponse.next();
}
// export async function middleware(request) {
//   const jwt = request.cookies.get("myTokenName");

//   if (!jwt) return NextResponse.redirect(new URL("/users", request.url));

//   try {
//     const { payload } = await jwtVerify(
//       jwt,
//       new TextEncoder().encode(secret)
//     );
//     console.log({ payload });
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/users", request.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
