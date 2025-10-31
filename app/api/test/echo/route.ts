// app/api/echo/route.ts
export async function POST(req: Request) {
  const body = await req.json(); // リクエストの中身を読む
  return Response.json({ youSent: body });
}
