import FooterTemplate from "@/app/shared/FooterTemplate";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import { ClerkProvider } from "@clerk/nextjs";
import "../src/app/globals.css";
import "../src/app/fonts.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>   
      <body>
      {children}
      </body>     
      </ClerkProvider>
    </html>
  )
}
