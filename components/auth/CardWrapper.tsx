"use client"

import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "../ui/card"
import { BackButton } from "./BackButton"
import { Social } from "./Social"
import { Header } from "./header"

interface CardWrapperProps {
    children:React.ReactNode,
    headerLabel:string,
    backButtonLabel:string,
    backButtonHref:string,
    showSocial?:boolean
}

export const CardWrapper = ({
    backButtonHref,
    backButtonLabel,
    children,
    headerLabel,
    showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md ">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
         {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
         )}
         <CardFooter>
            <BackButton 
                href={backButtonHref}
                label={backButtonLabel}
            />
         </CardFooter>
    </Card>
  )
}
