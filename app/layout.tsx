import { ClerkProvider } from "@clerk/nextjs";
import "../src/components/globals.css";
import "../src/components/fonts.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <ClerkProvider>   
      <body>
      {children}
      </body>     
      </ClerkProvider>
    </html>
  )
}
