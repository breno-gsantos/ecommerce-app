import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps{
  children: React.ReactNode;
  headerTitle: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export function CardWrapper({backButtonHref, backButtonLabel, children, headerTitle, headerDescription }: CardWrapperProps) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <Header title={headerTitle} description={headerDescription} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}